from rest_framework.views import APIView
from rest_framework.views import Response
from rest_framework import viewsets
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.utils import timezone
from SyncCalendar.models import UpdateRegister
from SyncCalendar.serializers import UpdateRegisterSerializer

from SyncCalendar.models import Schedule 
from SyncCalendar.serializers import AddSchedule, ScheduleSerializer

# Create your views here.
class getScheduleAPIView( APIView ):
    def get(self, request, format= None):
        appointment = appointment.objects.all()
        serializer = ScheduleSerializer(appointment, many=True)
        return Response(serializer.data, status= HTTP_200_OK)
    

# Metodo POST
class postScheduleAPIView(APIView):
    def post(self, request, format= None):
        serializer = AddSchedule(data= request.data)
        if serializer.is_valid():  #Verifica se os dados são validos
            saveData= Schedule(
                name = serializer.validated_data.get('name'),
                codLoja = serializer.validated_data.get('codLoja'),
                type = serializer.validated_data.get('type'),
                ticket = serializer.validated_data.get('ticket'),
                email =serializer.validated_data.get('email'),
                appointmentDate =serializer.validated_data.get('appointmentDate'),
                appointmentTime =serializer.validated_data.get('appointmentTime'),
                createdDate= timezone.now() 

            )
            saveData.save()
            data_serializer = ScheduleSerializer(saveData, many= False)
            return Response(data_serializer.data, status= HTTP_201_CREATED)
        return Response({
            "message": "Houveram erros de validação", 
            "errors": serializer.errors
            },
            status= HTTP_400_BAD_REQUEST
        )

class scheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class UpdateRegisterViewSet(viewsets.ModelViewSet):
    queryset = UpdateRegister.objects.all()
    serializer_class = UpdateRegisterSerializer