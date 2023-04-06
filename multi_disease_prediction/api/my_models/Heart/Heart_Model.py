from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn import svm
from sklearn.neighbors import KNeighborsClassifier  
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score, recall_score, precision_score
from sklearn.metrics import confusion_matrix
from scipy import stats as st
import numpy as np

class Custom_Model_Heart():
    def __init__(self):
        self.model_lr = LogisticRegression()
        self.model_tree = DecisionTreeClassifier(max_leaf_nodes=12)
        self.model_svm = svm.SVC(probability=True)
        self.model_rclf = RandomForestClassifier(n_estimators=150,max_depth=15,n_jobs=-1) 
        self.model_abc = AdaBoostClassifier()

    def model_fit(self,X_train,y_train):
        self.model_lr.fit(X_train,y_train)
        self.model_tree.fit(X_train,y_train)
        self.model_svm.fit(X_train,y_train)
        self.model_rclf.fit(X_train,y_train)
        self.model_abc.fit(X_train,y_train)

    def model_predict(self,X_test):
        predict_lr = self.model_lr.predict(X_test)
        predict_tree = self.model_tree.predict(X_test)
        predict_svm = self.model_svm.predict(X_test)
        predict_rf = self.model_rclf.predict(X_test)
        predict_abc = self.model_abc.predict(X_test)
        result =  np.array([predict_lr, predict_rf, predict_tree, predict_svm, predict_abc])
        r = st.mode(result,keepdims = True).mode[0]
        return r

    def model_predict_proba(self, X_test):
        predict_lr_proba = self.model_lr.predict_proba(X_test)
        predict_tree_proba = self.model_tree.predict_proba(X_test)
        predict_svm_proba = self.model_svm.predict_proba(X_test)
        predict_rf_proba = self.model_rclf.predict_proba(X_test)
        predict_abc_proba = self.model_abc.predict_proba(X_test)

        predict_proba_list = [predict_lr_proba, predict_tree_proba,predict_svm_proba,predict_rf_proba,predict_abc_proba]

        one_proba = 0
        zero_proba = 0
        for i in predict_proba_list:
            one_proba = one_proba + i[:,1]
            zero_proba = zero_proba + i[:,0]

        return (zero_proba)/5, (one_proba)/5

    def model_accuracy(self,y_test,res):
        self.accuracy = accuracy_score(y_test,res)
        return self.accuracy

    def model_recall(self,y_test,res):
        self.recall = recall_score(y_test,res)
        return self.recall

    def model_precision(self,y_test,res):
        self.precision = precision_score(y_test,res)
        return self.precision


