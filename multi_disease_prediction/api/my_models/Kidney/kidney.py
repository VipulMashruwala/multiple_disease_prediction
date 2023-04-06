import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

def dummy_var_bp(col):
    value = col[0]
    if value < 90:
        return 0    ### low
    elif 90 <= value <= 120:
        return 1      ### normal
    else:
        return 2      ### high

def data_preprocessing_kidney(df):
    df.rename(columns = {
                     'sg': 'specific_gravity',
                     'bp': 'BP',
                     'al' : 'albumin',
                     'su' : 'sugar',
                     'rbc' : 'RBC',
                     'pc' : 'pus_cell',
                     'pcc' : 'pus_cell_clumps',
                     'ba' : 'bacteria',
                     'bgr' : 'blood_glucose',
                     'bu' : 'blood_urea',
                     'sc' : 'serum_creatinine',
                     'sod' : 'sodium',
                     'pot' : 'potassium',
                     'hemo': 'hemoglobin',
                     'pcv' : 'packed_cell_vol',
                     'wc' : 'WBC',
                     'rc' : 'RBC Count',
                     'htn' : 'hypertension',
                     'dm' : 'diabetes',
                     'cad' : 'coronary_disease',
                     'appet' : 'appetite',
                     'pe' : 'pedal_edema',
                     'ane' : 'anemia', 
                     'classification' : 'class'
                     }, inplace = True)
    
    ## removing white space
    probColumns1 = ['RBC Count','diabetes','coronary_disease','packed_cell_vol','WBC','class']
    for i in probColumns1:
        df[i] = df[i].str.replace('\t','')

    # replacing the question mark with mean value
    probColumns2 = ['RBC Count','diabetes','coronary_disease','packed_cell_vol','WBC']
    for i in probColumns2:
        df[i] = df[i].replace('?',np.mean(pd.to_numeric(df[i], errors='coerce')))

    # replace the na value with mean 
    df = df.fillna(method="ffill",limit=1)

    for i in df.columns:
        df_clean = df.apply(lambda x: x.fillna(x.value_counts().index[0]))

    # converting the column to float type
    df_clean['packed_cell_vol']=df_clean['packed_cell_vol'].astype(float)
    df_clean['WBC']=df_clean['WBC'].astype(float)
    df_clean['RBC Count']=df_clean['RBC Count'].astype(float)

    ## handeling outlier
    df_clean = df_clean[~(df_clean['blood_glucose'] > 350)]
    df_clean = df_clean[~(df_clean['blood_urea'] > 175)]
    df_clean = df_clean[~(df_clean['serum_creatinine'] > 20)]
    df_clean = df_clean[~(df_clean['WBC'] > 20000)]
    df_clean = df_clean[~(df_clean['sodium'] < 100)]

    lab = LabelEncoder()
    catColumns = ['appetite','bacteria','pus_cell','anemia','pedal_edema','coronary_disease','RBC','diabetes','pus_cell_clumps','hypertension','class']

    for i in catColumns:
        df_clean[i]= lab.fit_transform(df_clean[i])


    df_clean['BP'] = df_clean[['BP']].apply(dummy_var_bp,axis=1)

    df_clean.drop(['packed_cell_vol','serum_creatinine','RBC Count','hypertension','sugar'], inplace = True, axis = 1)

    X_mean = dict(df_clean.drop(['class'],axis = 1).mean())
    X_std = dict(df_clean.drop(['class'],axis = 1).std())

    scaler = StandardScaler()
    cols_to_standardise = ['age','blood_glucose','WBC','blood_urea','sodium','potassium','hemoglobin']
    df_clean[cols_to_standardise] = scaler.fit_transform(df_clean[cols_to_standardise])

    X = df_clean.drop('class',axis=1)
    Y = df_clean['class']

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.30, random_state=42)
    return X_train, X_test, y_train, y_test, X_mean, X_std

    
    