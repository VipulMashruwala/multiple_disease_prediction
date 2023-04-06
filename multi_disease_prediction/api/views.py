from django.shortcuts import render
import requests
from django.core.files import File
from django.http import HttpResponse
import json
from .utils import update_csv, write_csv, build_model
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .my_models.Diabetes.diabetes import data_preprocessing_diabetes
from .my_models.Diabetes.Diabetes_Model import Custom_Model_Diabetes

from .my_models.Heart.heart import data_preprocessing_heart
from .my_models.Heart.Heart_Model import Custom_Model_Heart

from .my_models.Liver.liver import data_preprocessing_liver
from .my_models.Liver.Liver_Model import Custom_Model_Liver

from .my_models.Kidney.kidney import data_preprocessing_kidney
from .my_models.Kidney.Kidney_Model import Custom_Model_Kidney
import pandas as pd

import random

class DiabetesModel(APIView):
    def post(self, request):
        df = pd.read_csv('static/diabetes.csv')
        X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_diabetes(df)
        cust_model = Custom_Model_Diabetes()
        cust_model.model_fit(X_train,y_train)
        res = cust_model.model_predict(X_test)
        accuracy = cust_model.model_accuracy(y_test,res)
        recall = cust_model.model_recall(y_test,res)
        precision = cust_model.model_precision(y_test,res)

        final_dict = {}

        for key in request.data.keys():
            dta = (float(request.data[key]) - round(X_mean[key],3))/round(X_std[key],3)
            final_dict[key] = [dta]

        my_df = pd.DataFrame(final_dict)
        result = cust_model.model_predict(my_df)
        [zero_proba, one_proba] = cust_model.model_predict_proba(my_df)

        performance = {
            'Accuracy' : accuracy,
            'Recall' : recall,
            'Precision' : precision
        }

        probability = {
            'No Disease' : zero_proba[0],
            'Disease' : one_proba[0]
        }

        print(performance)

        print(probability)


        field_name = ['Pregnancies','Glucose','BloodPressure','SkinThickness','Insulin','BMI','DiabetesPedigreeFunction','Age','Outcome']
        
        my_data = {
            'Pregnancies' : request.data['Pregnancies'], 
            'Glucose' : request.data['Glucose'], 
            'BloodPressure' : request.data['BloodPressure'], 
            'SkinThickness' : 0, 
            'Insulin' : 0, 
            'BMI' : request.data['BMI'], 
            'DiabetesPedigreeFunction' : request.data['DiabetesPedigreeFunction'], 
            'Age' : request.data['Age'], 
            'Outcome' : result[0]
        }

        my_csv_file = 'static/diabetes.csv'

        # update_csv(my_csv_file, my_data, field_name)

        if result == 0:
            return Response({'msg':'No need to fear. You have no dangerous symptoms of the disease', 
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')
        else:
            return Response({'msg': "Sorry you have chances of getting the disease. Please consult the doctor immediately" ,
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')

class DownloadReport(APIView):
    def post(self, request):
        print(request.data)
        user_data = request.data['username']
        my_data = request.data['prediction_data']
        disease = request.data['disease']
        performance = json.loads(request.data['performance'])
        probability = json.loads(request.data['probability'])

        write_csv(user_data,my_data,disease,performance,probability)
        path_to_file = 'static/report.csv'
        f = open(path_to_file, 'r')
        csvFile = File(f)
        response = HttpResponse(csvFile.read())
        response['Content-Disposition'] = 'attachment'
        return response
      
        
    
class HeartModel(APIView):
    def post(self, request):
        
        if request.data['gender'] == 'male':
            request.data['gender'] = 0
        else: 
            request.data['gender'] = 1

        if request.data['cholestoral'] == 'normal':
            request.data['cholestoral'] = 1
        elif request.data['cholestoral'] == 'high': 
            request.data['cholestoral'] = 2
        else:
            request.data['cholestoral'] = 3

        if request.data['glucose'] == 'normal':
            request.data['glucose'] = 1
        elif request.data['glucose'] == 'high': 
            request.data['glucose'] = 2
        else:
            request.data['glucose'] = 3

        if request.data['smoking'] == 'yes':
            request.data['smoking'] = 1
        else: 
            request.data['smoking'] = 0

        if request.data['alcohol'] == 'yes':
            request.data['alcohol'] = 1
        else: 
            request.data['alcohol'] = 0

        if request.data['physical_activity'] == 'good':
            request.data['physical_activity'] = 1
        else: 
            request.data['physical_activity'] = 0

        df = pd.read_csv('static/heart.csv')
        X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_heart(df)
        print(df)
        cust_model = Custom_Model_Heart()
        cust_model.model_fit(X_train,y_train)
        res = cust_model.model_predict(X_test)
        accuracy = cust_model.model_accuracy(y_test,res)
        recall = cust_model.model_recall(y_test,res)
        precision = cust_model.model_precision(y_test,res)
        
        final_dict = {}

        lst = ['age','sys_bp','dia_bp','bmi']

        for key in request.data.keys():
            if key in lst:
                dta = (float(request.data[key]) - round(X_mean[key],3))/round(X_std[key],3)
                final_dict[key] = [dta]
            else:
                final_dict[key] = [request.data[key]]

        my_df = pd.DataFrame(final_dict)
        result = cust_model.model_predict(my_df)
        [zero_proba, one_proba] = cust_model.model_predict_proba(my_df)

        performance = {
            'Accuracy' : accuracy,
            'Recall' : recall,
            'Precision' : precision 
        }

        probability = {
            'No Disease' : zero_proba[0],
            'Disease' : one_proba[0]
        }

        field_name = ['age','gender','sys_bp','dia_bp','cholestoral','glucose','smoking','alcohol','physical_activity','bmi','outcome']
        
        my_data = {
            'age' : request.data['age'], 
            'gender' : request.data['gender'], 
            'sys_bp' : request.data['sys_bp'], 
            'dia_bp' : request.data['dia_bp'], 
            'cholestoral' : request.data['cholestoral'],
            'glucose' : request.data['glucose'], 
            'smoking' : request.data['smoking'], 
            'alcohol' : request.data['alcohol'], 
            'physical_activity' : request.data['physical_activity'], 
            'bmi' : request.data['bmi'], 
            'outcome' : result[0]
        }

        my_csv_file = 'static/heart.csv'

        # update_csv(my_csv_file, my_data, field_name)

        if result == 0:
            return Response({'msg':'No need to fear. You have no dangerous symptoms of the disease',
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')
        else:
            return Response({'msg':"Sorry you have chances of getting the disease. Please consult the doctor immediately",
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')
        
class LiverModel(APIView):
    def post(self, request):
        if request.data['Gender'] == 'Male':
            request.data['Gender'] = 1
        else: 
            request.data['Gender'] = 0

        df = pd.read_csv('static/liver.csv')
    
        X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_liver(df)
        cust_model = Custom_Model_Liver()
        cust_model.model_fit(X_train,y_train)
        res = cust_model.model_predict(X_test)
        accuracy = cust_model.model_accuracy(y_test,res)
        recall = cust_model.model_recall(y_test,res)
        precision = cust_model.model_precision(y_test,res)

        final_dict = {}

        lst = ['Age','Total_Bilirubin','Alkaline_Phosphotase','SGOT','Total_Protiens','Albumin_and_Globulin_Ratio']

        for key in request.data.keys():
            if key in lst:
                dta = (float(request.data[key]) - round(X_mean[key],3))/round(X_std[key],3)
                final_dict[key] = [dta]
            else:
                final_dict[key] = [request.data[key]]

        my_df = pd.DataFrame(final_dict)
        result = cust_model.model_predict(my_df)
        [zero_proba, one_proba] = cust_model.model_predict_proba(my_df)

        performance = {
            'Accuracy' : accuracy,
            'Recall' : recall,
            'Precision' : precision 
        }

        probability = {
            'No Disease' : zero_proba[0],
            'Disease' : one_proba[0]
        }


        field_name = ['Age','Gender','Total_Bilirubin','Direct_Bilirubin','Alkaline_Phosphotase','SGPT','SGOT','Total_Protiens','Albumin','Albumin_and_Globulin_Ratio','Outcome']
        
        my_data = {
            'Age' : request.data['Age'], 
            'Gender' : request.data['Gender'], 
            'Total_Bilirubin' : request.data['Total_Bilirubin'], 
            'Direct_Bilirubin' : 0, 
            'Alkaline_Phosphotase' : request.data['Alkaline_Phosphotase'], 
            'SGPT' : 0, 
            'SGOT' : request.data['SGOT'], 
            'Total_Protiens' : request.data['Total_Protiens'], 
            'Albumin' : 0,
            'Albumin_and_Globulin_Ratio' : request.data['Albumin_and_Globulin_Ratio'],
            'Outcome' : result[0]
        }

        my_csv_file = 'static/liver.csv'

        # update_csv(my_csv_file, my_data, field_name)

        if result == 0:
            return Response({'msg':'No need to fear. You have no dangerous symptoms of the disease',
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')
        else:
            return Response({'msg':"Sorry you have chances of getting the disease. Please consult the doctor immediately",
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')
        
class KidneyModel(APIView):
     def post(self, request):
        if request.data['BP'] == 'low':
            request.data['BP'] = 0
        elif request.data['BP'] == 'normal': 
            request.data['BP'] = 1
        else:
            request.data['BP'] = 2
            
        if request.data['RBC'] == 'normal':
            request.data['RBC'] = 0
        else: 
            request.data['RBC'] = 1

        if request.data['pus_cell'] == 'yes':
            request.data['pus_cell'] = 1
        else: 
            request.data['pus_cell'] = 0

        if request.data['pus_cell_clumps'] == 'present':
            request.data['pus_cell_clumps'] = 1
        else: 
            request.data['pus_cell_clumps'] = 0

        if request.data['bacteria'] == 'present':
            request.data['bacteria'] = 1
        else: 
            request.data['bacteria'] = 0

        if request.data['diabetes'] == 'yes':
            request.data['diabetes'] = 1
        else: 
            request.data['diabetes'] = 0

        if request.data['coronary_disease'] == 'yes':
            request.data['coronary_disease'] = 1
        else: 
            request.data['coronary_disease'] = 0

        if request.data['appetite'] == 'good':
            request.data['appetite'] = 1
        else: 
            request.data['appetite'] = 0

        if request.data['pedal_edema'] == 'yes':
            request.data['pedal_edema'] = 1
        else: 
            request.data['pedal_edema'] = 0

        if request.data['anemia'] == 'yes':
            request.data['anemia'] = 1
        else: 
            request.data['anemia'] = 0

        
        df = pd.read_csv('static/kidney.csv')
        X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_kidney(df)
        cust_model = Custom_Model_Kidney()
        cust_model.model_fit(X_train,y_train)
        res = cust_model.model_predict(X_test)
        accuracy = cust_model.model_accuracy(y_test,res)
        recall = cust_model.model_recall(y_test,res)
        precision = cust_model.model_precision(y_test,res)

        lst1 = ['age','blood_glucose','blood_urea','sodium','potassium','hemoglobin','WBC']

        final_dict = {}
        
        for key in request.data.keys():
            if key in lst1:
                dta = (float(request.data[key]) - round(X_mean[key],3))/round(X_std[key],3)
                final_dict[key] = [dta]
            else:
                final_dict[key] = [request.data[key]]
       
        final_dict['specific_gravity'][0] = float(final_dict['specific_gravity'][0])
        final_dict['albumin'][0] = int(final_dict['albumin'][0])

        my_df = pd.DataFrame(final_dict)

        result = cust_model.model_predict(my_df)
        [zero_proba, one_proba] = cust_model.model_predict_proba(my_df)

        performance = {
            'Accuracy' : accuracy,
            'Recall' : recall,
            'Precision' : precision 
        }

        probability = {
            'No Disease' : zero_proba[0],
            'Disease' : one_proba[0]
        }

        field_name = ['age','BP','specific_gravity','albumin','sugar','RBC','pus_cell','pus_cell_clumps','bacteria','blood_glucose','blood_urea','serum_creatinine','sodium','potassium','hemoglobin','packed_cell_vol','WBC','RBC Count','hypertension','diabetes','coronary_disease','appetite','pedal_edema','anemia','class']
    
        my_data = {
            'age' : request.data['age'], 
            'BP' : request.data['BP'], 
            'specific_gravity' : request.data['specific_gravity'], 
            'albumin' : request.data['albumin'], 
            'sugar' : 0, 
            'RBC' : request.data['RBC'], 
            'pus_cell' : request.data['pus_cell'], 
            'pus_cell_clumps' : request.data['pus_cell_clumps'], 
            'bacteria' : request.data['bacteria'],
            'blood_glucose' : request.data['blood_glucose'],
            'blood_urea' : request.data['blood_urea'],
            'serum_creatinine' : 0, 
            'sodium' : request.data['sodium'], 
            'potassium' : request.data['potassium'], 
            'hemoglobin' : request.data['hemoglobin'], 
            'packed_cell_vol' : 0, 
            'WBC' : request.data['WBC'], 
            'RBC Count' : 0, 
            'hypertension' : 0, 
            'diabetes' : request.data['diabetes'],
            'appetite' : request.data['appetite'],
            'pedal_edema' : request.data['pedal_edema'],
            'anemia' : request.data['anemia'], 
            'class' : result[0]
        }

        my_csv_file = 'static/kidney.csv'

        # update_csv(my_csv_file, my_data, field_name)

        if result == 0:
            return Response({'msg':'No need to fear. You have no dangerous symptoms of the disease',
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')
        else:
            return Response({'msg':'Sorry you have chances of getting the disease. Please consult the doctor immediately',
                             'per_data' : json.dumps(performance),
                             'probability' : json.dumps(probability)}, content_type = 'application/json')

    
class SignUp(APIView):
     def post(self, request):
        print(request.data)
        id = request.data['username'] + str(random.randint(10001,99999))
        username = request.data['username']
        password = request.data['password']

        myData = {
            'id' : id,
            'username' : username,
            'password' : password,
        }

        requests.post('https://multiplediseasepredictio-40f91-default-rtdb.firebaseio.com/data.json',
        json = myData)

        return Response({'msg':'Sign Up Successfully'}, content_type = 'application/json')
     

class SignIn(APIView):
     def post(self, request):
        username = request.data['username']
        password = request.data['password']

        d = requests.get('https://multiplediseasepredictio-40f91-default-rtdb.firebaseio.com/data.json')
        dataDict = d.json()

        for values in dataDict.values():
            if values['username'] == username and values['password'] == password:
                signin_user_data = {
                    'id' : values['id'],
                    'username' : values['username']
                }

                return Response({'msg':'Sign In Successfully', 'user_data' : json.dumps(signin_user_data)}, content_type = 'application/json')
            
        return Response({'msg':'User not exist'}, content_type = 'application/json') 


class ShowComparisionReport(APIView):
    def post(self, request):
        raw_data = request.data.split(" ")
        disease = raw_data[0].lower()
        print(disease)
        if disease == 'diabetes':
            df = pd.read_csv('static/diabetes.csv') 
            X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_diabetes(df)
            lst = build_model(X_train, X_test, y_train, y_test)
            cust_model = Custom_Model_Diabetes()
            cust_model.model_fit(X_train,y_train)
            res = cust_model.model_predict(X_test)
            accuracy = cust_model.model_accuracy(y_test,res)
            recall = cust_model.model_recall(y_test,res)
            precision = cust_model.model_precision(y_test,res)
            lst.append([accuracy,recall,precision])

        elif disease == 'heart':
            df = pd.read_csv('static/heart.csv') 
            X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_heart(df)
            lst = build_model(X_train, X_test, y_train, y_test)
            cust_model = Custom_Model_Heart()
            cust_model.model_fit(X_train,y_train)
            res = cust_model.model_predict(X_test)
            accuracy = cust_model.model_accuracy(y_test,res)
            recall = cust_model.model_recall(y_test,res)
            precision = cust_model.model_precision(y_test,res)
            lst.append([accuracy,recall,precision])

        elif disease == 'liver':
            df = pd.read_csv('static/liver.csv') 
            X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_liver(df)
            lst = build_model(X_train, X_test, y_train, y_test)
            cust_model = Custom_Model_Liver()
            cust_model.model_fit(X_train,y_train)
            res = cust_model.model_predict(X_test)
            accuracy = cust_model.model_accuracy(y_test,res)
            recall = cust_model.model_recall(y_test,res)
            precision = cust_model.model_precision(y_test,res)
            lst.append([accuracy,recall,precision])

        elif disease == 'kidney':
            df = pd.read_csv('static/kidney.csv') 
            X_train, X_test, y_train, y_test, X_mean, X_std = data_preprocessing_kidney(df)
            lst = build_model(X_train, X_test, y_train, y_test)
            cust_model = Custom_Model_Kidney()
            cust_model.model_fit(X_train,y_train)
            res = cust_model.model_predict(X_test)
            accuracy = cust_model.model_accuracy(y_test,res)
            recall = cust_model.model_recall(y_test,res)
            precision = cust_model.model_precision(y_test,res)
            lst.append([accuracy,recall,precision])

        model_dict = {}
        model_list = ['LR','DT','NB','SVM','KNN','RF','AdaBoost','XGBoost','Custom Model \n (Ensemble Learning)']
        for i in range(len(model_list)):
            model_dict[model_list[i]] = {
                'Accuracy' : lst[i][0],
                'Recall' : lst[i][1],
                'Precision' : lst[i][2],
            }

        return Response({'data' : json.dumps(model_dict)}, content_type = 'application/json') 

                


        