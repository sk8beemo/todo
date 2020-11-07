from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include

from config import settings, views

urlpatterns = [
    path('', views.index),
    path('admin/', admin.site.urls),
    path('api/v1/', include('src.routers')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)