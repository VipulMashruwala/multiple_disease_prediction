from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('diabetes',views.DiabetesModel.as_view()),
    path('download',views.DownloadReport.as_view()),
    path('comparisonResult',views.ShowComparisionReport.as_view()),

    path('heart',views.HeartModel.as_view()),
    path('liver',views.LiverModel.as_view()),
    path('kidney',views.KidneyModel.as_view()),
    path('signup',views.SignUp.as_view()),
    path('signin',views.SignIn.as_view()),
  
]
