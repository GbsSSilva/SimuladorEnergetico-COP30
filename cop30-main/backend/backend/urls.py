from django.contrib import admin
from django.urls import path
from landing.views import DeviceListCreate, index  # Importe a view DeviceListCreate e a função index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),  # Rota para a página inicial
    path('api/devices/', DeviceListCreate.as_view(), name='device-list-create'),  # Rota para a API de dispositivos
]
