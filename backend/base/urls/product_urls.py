from base.views.product_views import getProduct, getProducts
from django.urls import path
from rest_framework_simplejwt.views import ( TokenObtainPairView )


urlpatterns = [
    path('', getProducts, name="products"),
    path('<str:pk>/', getProduct, name="product"),
] 