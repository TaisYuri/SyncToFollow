from dataclasses import field, fields
from django.forms import ValidationError
from rest_framework import serializers
from SyncCalendar.models import Schedule, UpdateRegister, UpdateImage

class ScheduleSerializer( serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


## METODO POST
class AddSchedule(serializers.Serializer):
    name = serializers.CharField(max_length=80)
    codLoja = serializers.CharField(max_length=4)
    type = serializers.CharField(max_length=100)
    ticket = serializers.CharField(max_length=8)
    email = serializers.EmailField(max_length= 255)
    appointmentDate = serializers.DateField()
    appointmentTime = serializers.TimeField()

    def  validate_name(self, value):
        if len(value) < 3:
             raise ValidationError("Campo NOME deve ter pelo menos 3 caracteres")
        return value
    
    def  validate_codLoja(self, value):
        if len(value) < 4:
             raise ValidationError("Campo Codigo da loja deve ser formado por 4 digitos")
        return value
    

class UpdateRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdateRegister
        fields = '__all__'  # Para incluir todos os campos do modelo

   
class UpdateImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdateImage
        fields = ['fileK']  # Para incluir todos os campos do modelo

   