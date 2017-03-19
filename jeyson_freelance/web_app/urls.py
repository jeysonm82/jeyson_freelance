from django.conf.urls import include, url
from . import views
from django.views.decorators.cache import cache_page

urlpatterns = [
    url(r'^$', cache_page(12*3600)(views.HomeView.as_view()), name='home'),
]
