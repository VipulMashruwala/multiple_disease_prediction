import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split


def data_preprocessing_diabetes(df):
   
    df['Glucose'].replace(0, np.nan, inplace=True)
    df['BloodPressure'].replace(0, np.nan, inplace=True)
    df['SkinThickness'].replace(0, np.nan, inplace=True)
    df['Insulin'].replace(0, np.nan, inplace=True)
    df['BMI'].replace(0, np.nan, inplace=True)

    df['Glucose'] = df['Glucose'].replace(np.NaN, df['Glucose'].mean())
    df['BloodPressure'] = df['BloodPressure'].replace(np.NaN, df['BloodPressure'].mean())
    df['SkinThickness'] = df['SkinThickness'].replace(np.NaN, df['SkinThickness'].mean())
    df['Insulin'] = df['Insulin'].replace(np.NaN, df['Insulin'].mean())
    df['BMI'] = df['BMI'].replace(np.NaN, df['BMI'].mean())

    df.drop(['Insulin','SkinThickness'],inplace = True, axis = 1)

    df = df[~(df['Pregnancies'] >= 12)]
    df = df[~(df['BloodPressure'] > 110)]
    df = df[~(df['BloodPressure'] < 40)]
    df = df[~(df['BMI'] > 50)]
    df = df[~(df['DiabetesPedigreeFunction'] > 1.2)]
    df.dropna(inplace = True)

    X_mean = dict(df.drop(['Outcome'],axis = 1).mean())
    X_std = dict(df.drop(['Outcome'],axis = 1).std())

    scaler = StandardScaler()
    cols_to_standardise = ['Age','Pregnancies','Glucose','BMI','BloodPressure']
    df[cols_to_standardise] = scaler.fit_transform(df[cols_to_standardise])
    
    X = df.drop('Outcome',axis=1)
    Y = df['Outcome']
  
    X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state = 0)
    return X_train, X_test, y_train, y_test, X_mean, X_std
