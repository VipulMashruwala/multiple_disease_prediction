import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


# men = 0 women 1 
def preProcessGender(col):
    value = col[0]
    if value == 2:
        return 0
    else:
        return value
    
def data_preprocessing_heart(df):

    df['gender'] = df[['gender']].apply(preProcessGender,axis=1)

    ## outlier handeling
    df = df[~(df['age'] < 35)]
    df = df[~(df['sys_bp'] > 180)]
    df = df[~(df['sys_bp'] <= 40)]
    df = df[~(df['dia_bp'] > 180)]
    df = df[~(df['dia_bp'] <= 40)]
    df = df[~(df['bmi'] > 70)]

    X_mean = dict(df.drop(['outcome'],axis = 1).mean())
    X_std = dict(df.drop(['outcome'],axis = 1).std())

    scaler = StandardScaler()
    cols_to_standardise = ['age','sys_bp','dia_bp','bmi']
    df[cols_to_standardise] = scaler.fit_transform(df[cols_to_standardise])

    X = df.drop(['outcome'],axis=1)
    Y = df['outcome']

    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=101)
    return X_train, X_test, y_train, y_test, X_mean, X_std

    
    
    
