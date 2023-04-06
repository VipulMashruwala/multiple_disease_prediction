import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

def outcomeVariable(col):
    value = col[0]
    if value == 1:
        return 1
    else:
        return 0
    
def dummy_var(col):
    value = col[0]
    if value == 'Male':
        return 1
    else:
        return 0

def data_preprocessing_liver(df):
    
    # df.rename(columns = {
    #                  'Dataset': 'Outcome',
    #                  'Alamine_Aminotransferase' : 'SGPT',
    #                  'Aspartate_Aminotransferase' : 'SGOT'
    #                  }, inplace = True)
    
    df.dropna(inplace = True)

    df.drop(['Direct_Bilirubin','Albumin','SGPT'], axis = 1, inplace = True)

    df['Outcome'] = df[['Outcome']].apply(outcomeVariable,axis=1)

    df = df[~(df['Total_Bilirubin'] > 15)]
    df = df[~(df['Alkaline_Phosphotase'] > 750)]
    # df = df[~(df['SGPT'] > 300)]
    df = df[~(df['SGOT'] > 350)]
    df = df[~(df['Albumin_and_Globulin_Ratio'] > 2.0)]

    df['Gender'] = df[['Gender']].apply(dummy_var,axis=1)

    X_mean = dict(df.drop(['Outcome'],axis = 1).mean())
    X_std = dict(df.drop(['Outcome'],axis = 1).std())

    scaler = StandardScaler()
    cols_to_standardise = ['Age','Total_Bilirubin','Alkaline_Phosphotase','SGOT','Total_Protiens','Albumin_and_Globulin_Ratio']
    df[cols_to_standardise] = scaler.fit_transform(df[cols_to_standardise])

    X = df.drop('Outcome',axis=1)
    Y = df['Outcome']
  
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=101)
    return X_train, X_test, y_train, y_test, X_mean, X_std
