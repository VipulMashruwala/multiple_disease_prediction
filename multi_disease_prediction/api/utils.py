from csv import DictWriter
import csv
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn import svm
from sklearn.neighbors import KNeighborsClassifier  
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, recall_score, precision_score
from sklearn.metrics import confusion_matrix

def update_csv(my_csv_file, my_data, field_name):
    with open(my_csv_file, 'a', newline='') as f_object:
        writer_object = DictWriter(f_object, delimiter=',', fieldnames = field_name)
        writer_object.writerow(my_data)
        f_object.close()

def write_csv(user_data,my_data,disease,performance,probability):
    file_path = 'static/report.csv'
    field_name = list(my_data.keys())
    performance_field_name = list(performance.keys())
    probability_field_name = list(probability.keys())
    
    with open(file_path, 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Name', user_data])
        writer.writerow('\n')

        writer.writerow(['Disease', disease])
        writer.writerow('\n')
        
        writer.writerow(['Performance'])
        writer.writerow(performance_field_name)
        writer1 = csv.DictWriter(file, fieldnames = performance_field_name)
        writer1.writerow(performance)
        writer.writerow('\n')

        writer.writerow(['Predicted Probability'])
        writer.writerow(probability_field_name)
        writer2 = csv.DictWriter(file, fieldnames = probability_field_name)
        writer2.writerow(probability)
        writer.writerow('\n')

        writer.writerow(field_name)
        writer3 = csv.DictWriter(file, fieldnames = field_name)
        writer3.writerow(my_data)

        file.close()

def build_model(X_train, X_test, y_train, y_test):
    ## Logistic Regression
    model_log_reg = LogisticRegression()
    model_log_reg.fit(X_train,y_train)
    predict_lr = model_log_reg.predict(X_test)
    cf_log_reg = confusion_matrix(y_test,predict_lr)
    accuracy_log_reg_scr = accuracy_score(y_test,predict_lr)
    recall_log_reg_scr = recall_score(y_test,predict_lr)
    precision_log_reg_scr = precision_score(y_test,predict_lr)
    logistic_regression = [accuracy_log_reg_scr, recall_log_reg_scr, precision_log_reg_scr]

    ## Decision Tree
    model_tree = DecisionTreeClassifier(max_leaf_nodes=10,random_state=0)
    model_tree.fit(X_train,y_train)
    predict_tree = model_tree.predict(X_test)
    cf_tree = confusion_matrix(y_test,predict_tree)
    accuracy_scr_tree = accuracy_score(y_test,predict_tree)
    recall_tree = recall_score(y_test,predict_tree)
    precision_tree = precision_score(y_test,predict_tree)
    decision_tree = [accuracy_scr_tree, recall_tree, precision_tree]
   
    ## KNN
    model_knn = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2 )  
    model_knn.fit(X_train,y_train)
    predict_knn = model_knn.predict(X_test)
    cf_knn = confusion_matrix(y_test,predict_knn)
    accuracy_scr_knn = accuracy_score(y_test,predict_knn)
    recall_scr_knn = recall_score(y_test,predict_knn)
    precision_scr_knn = precision_score(y_test,predict_knn)
    knn = [accuracy_scr_knn, recall_scr_knn, precision_scr_knn ]
   

    ## Navie Bayes Classifier
    model_naive_bayes = GaussianNB()
    model_naive_bayes.fit(X_train,y_train)
    predict_naive_bayes = model_naive_bayes.predict(X_test)
    cf_naive_bayes = confusion_matrix(y_test,predict_naive_bayes)
    accuracy_naive_bayes = accuracy_score(y_test,predict_naive_bayes)
    recall_naive_bayes = recall_score(y_test,predict_naive_bayes)
    precision_naive_bayes = precision_score(y_test,predict_naive_bayes)
    naive_bayes = [accuracy_naive_bayes, recall_naive_bayes, precision_naive_bayes]
    

    ## SVM
    krnl = ['linear','rbf','sigmoid']
    val = 0
    for i in krnl:
        model_svm = svm.SVC(kernel=i)
        model_svm.fit(X_train, y_train)
        y_pred_svm = model_svm.predict(X_test)
        cf_svm = confusion_matrix(y_test,y_pred_svm)
        accuracy_svm = accuracy_score(y_test,y_pred_svm)
        if accuracy_svm > val:
            val = accuracy_svm
            recall_svm = recall_score(y_test,y_pred_svm)
            precision_svm = precision_score(y_test,y_pred_svm)
    suprt_vec_mach = [val, recall_svm, precision_svm ]

    ## Ensemble Learning
    # Random Forest
    clf = RandomForestClassifier() 
    clf.fit(X_train, y_train)
    y_pred_rm = clf.predict(X_test)
    cf_rm = confusion_matrix(y_test,y_pred_rm)
    accuracy_scr_rm = accuracy_score(y_test,y_pred_rm)
    recall_scr_rm = recall_score(y_test,y_pred_rm)
    precision_scr_rm = precision_score(y_test,y_pred_rm)
    random_forest = [accuracy_scr_rm, recall_scr_rm, precision_scr_rm]
  
    # AdaBoost
    abc = AdaBoostClassifier()
    model_abc = abc.fit(X_train, y_train)
    y_pred_abc = model_abc.predict(X_test)
    cf_abc = confusion_matrix(y_test,y_pred_abc)
    accuracy_scr_abc = accuracy_score(y_test,y_pred_abc)
    recall_scr_abc = recall_score(y_test,y_pred_abc)
    precision_scr_abc = precision_score(y_test,y_pred_abc)
    ada_boost = [accuracy_scr_abc, recall_scr_abc, precision_scr_abc]

    ## xgboost
    xgb = XGBClassifier()
    xgb_model = xgb.fit(X_train,y_train)
    y_pred_xgb = xgb_model.predict(X_test)
    cf_xgb = confusion_matrix(y_test,y_pred_xgb)
    accuracy_scr_xgb = accuracy_score(y_test,y_pred_xgb)
    recall_scr_xgb = recall_score(y_test,y_pred_xgb)
    precision_scr_xgb = precision_score(y_test,y_pred_xgb)
    xg_boost = [accuracy_scr_xgb, recall_scr_xgb, precision_scr_xgb]
    
    return [logistic_regression, decision_tree, naive_bayes, knn,suprt_vec_mach,random_forest, ada_boost, xg_boost]
   
