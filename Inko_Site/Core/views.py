from django.template.loader import get_template
from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict

import json
import datetime
# Create your views here.
def home(request: WSGIRequest):
    print(request)
    page = get_template("Core/Home.html")
    return HttpResponse(page.render())