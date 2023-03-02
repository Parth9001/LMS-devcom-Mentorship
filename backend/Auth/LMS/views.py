from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from LMS.models import Book, Genre, Author, Order
from LMS.serializers import BookSerializer, GenreSerializer, AuthorSerializer, AdminBookSerializer, OrderSerializer
from django.db.models import Q
import datetime


    
# Create your views here.
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK, 
    HTTP_201_CREATED,
    HTTP_403_FORBIDDEN,
    HTTP_204_NO_CONTENT
)

from rest_framework.response import Response

'''
The Following three functions contain views for getting Models. 
If the logged in user is a superuser then it also gives options to POST (create) a model object.
'''
@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def book_list_display(request):
    if request.method == 'GET':
        query = request.GET.get('q')
        if query:
            books = Book.objects.filter(Q(title__icontains = query) | Q(desc__icontains = query))
        else:                                  
            books = Book.objects.all()
        if  request.user.is_superuser:
            serializer = AdminBookSerializer(books, many=True)
            return Response(serializer.data)
        else:
            serializer = BookSerializer(books, many=True)
            return Response(serializer.data)
    elif request.method =='POST' and request.user.is_superuser:
        
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)   
    elif request.method =='POST' and not request.user.is_superuser:
        return Response(status = HTTP_403_FORBIDDEN, data={"detail": "Acess Forbidden."})
            
    return Response(status = HTTP_400_BAD_REQUEST, data={"detail": "Authentication credentials were not provided."})


@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def author_list_display(request):
    if request.method == 'GET':
        query = request.GET.get('q')
        if query:
            authors = Author.objects.filter(Q(name__icontains = query) | Q(desc__icontains = query))
        else:
            authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)
    elif request.method =='POST' and request.user.is_superuser:
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)   
    elif request.method =='POST' and not request.user.is_superuser:
        return Response(status = HTTP_403_FORBIDDEN, data={"detail": "Acess Forbidden."})
            
    return Response(status = HTTP_400_BAD_REQUEST, data={"detail": "Authentication credentials were not provided."})


@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def genre_list_display(request):
    if request.method == 'GET':
        query = request.GET.get('q')
        if query:
            genre = Genre.objects.filter(Q(name__icontains = query) | Q(desc__icontains = query))
        else:
            genre = Genre.objects.all()
        serializer = GenreSerializer(genre, many=True)
        return Response(serializer.data)
    elif request.method =='POST' and request.user.is_superuser:
        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)   
    elif request.method =='POST' and not request.user.is_superuser:
        return Response(status = HTTP_403_FORBIDDEN, data={"detail": "Acess Forbidden."})
            
    return Response(status = HTTP_400_BAD_REQUEST, data={"detail": "Authentication credentials were not provided."})



'''
The following three functions return views/api endpoints for retrieving a particular 
Object of Genre, Author, Book using using slug.
It gives  PUT, DELETE option if the logged in user is superuser.
'''


@api_view(['GET', 'PUT','DELETE'])
@permission_classes((AllowAny,))
def book_details(request, slug):
    try:
        book = Book.objects.get(slug=slug)
            
    except Book.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND, data = {'detail':'Book Does Not Exist'})

    if request.method =='GET':
        if request.user.is_superuser:
            serializer = AdminBookSerializer(book)
            return Response(serializer.data, status=HTTP_200_OK)
        else:
            serializer = BookSerializer(book)
            return Response(serializer.data, status=HTTP_200_OK)
    
    elif request.method =='PUT' and request.user.is_superuser:
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    elif request.method =='PUT' and request.user.is_superuser:
        book.DELETE()
        return Response(status=HTTP_204_NO_CONTENT)
    

    elif (request.method =='PUT' or request.method =='DELETE') and not request.user.is_superuser:
        return Response(data={"data":"Access Forbidden"}, status=HTTP_403_FORBIDDEN)
    


#getting Genre by Slug
@api_view(['GET', 'PUT','DELETE'])
@permission_classes((AllowAny,))
def genre_details(request, slug):
    try:
        genre = Genre.objects.get(slug=slug)
            
    except Genre.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND, data = {'detail':'Book Does Not Exist'})

    if request.method =='GET':
        serializer = GenreSerializer(genre)
        return Response(serializer.data, status=HTTP_200_OK)
    
    elif request.method =='PUT' and request.user.is_superuser:
        serializer = GenreSerializer(genre, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    elif request.method =='PUT' and request.user.is_superuser:
        genre.DELETE()
        return Response(status=HTTP_204_NO_CONTENT)
    

    elif (request.method =='PUT' or request.method =='DELETE') and not request.user.is_superuser:
        return Response(data={"data":"Access Forbidden"}, status=HTTP_403_FORBIDDEN)
    


#Getting Author by slug
@api_view(['GET', 'PUT','DELETE'])
@permission_classes((AllowAny,))
def author_details(request, slug):
    try:
        author = Author.objects.get(slug=slug)
            
    except Author.DoesNotExist:
        return Response(status=HTTP_404_NOT_FOUND, data = {'detail':'Book Does Not Exist'})

    if request.method =='GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data, status=HTTP_200_OK)
    
    elif request.method =='PUT' and request.user.is_superuser:
        serializer = AuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    elif request.method =='PUT' and request.user.is_superuser:
        author.DELETE()
        return Response(status=HTTP_204_NO_CONTENT)
    

    elif (request.method =='PUT' or request.method =='DELETE') and not request.user.is_superuser:
        return Response(data={"data":"Access Forbidden"}, status=HTTP_403_FORBIDDEN)


@api_view(['GET'])
def issued_book_list_display(request):
    if request.method == 'GET' and request.user.is_superuser:
        books = Book.objects.filter(availability=False)
        serializer = AdminBookSerializer(books, many=True)
        return Response(serializer.data)
    return Response(data={"data":"Access Forbidden"}, status=HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes((AllowAny,))
def orders_list(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many =True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((AllowAny,))
def trending_books(request):
    ordered_books = Order.objects.all()
    
    orderss = [
        {'book_id': 123, 'order_date': datetime.datetime(2022, 1, 1), 'title':'Life of Pi'}
    ]
    for orders in ordered_books:
        book_id = orders.book.id
        title = str(orders.book)
        order_date = orders.order_date
        orderss.append({'book_id': book_id,'title':title, 'order_date':order_date})
    return Response(data=orderss)
    