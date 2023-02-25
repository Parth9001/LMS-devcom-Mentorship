from rest_framework import serializers
from .models import Book, Genre, Author
from authentication.models import Student

'''
two distinct serializers for the Book model that exhibit varying data sets based on the requesting user. Specifically, if the user making the request is a privileged superuser, they are granted access to the additional issued_to field of the Book model.'''
class BookSerializer(serializers.ModelSerializer):
    genre = serializers.PrimaryKeyRelatedField(queryset= Genre.objects.all(), many=True,required = False)
    thumb_img = serializers.ImageField(required = False, allow_null = True)
    class Meta:
        model = Book
        fields = ('id', 'genre', 'thumb_img', 'title', 'slug', 'availability', 'author', 'desc')

class AdminBookSerializer(serializers.ModelSerializer):
    genre = serializers.PrimaryKeyRelatedField(queryset= Genre.objects.all(), many=True,required = False)
    issued_to = serializers.PrimaryKeyRelatedField(queryset= Student.objects.all(), required = False, allow_null=True)
    thumb_img = serializers.ImageField(required = False, allow_null = True)
    class Meta:
        model = Book
        fields = '__all__'

        


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'