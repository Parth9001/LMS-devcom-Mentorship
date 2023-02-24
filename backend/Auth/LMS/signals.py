from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Book, Genre, Author
from django.utils.text import slugify
import random
import string


'''
For this project, every accessbile Model has a Dynamic Slug with some
random string, to have a look_up field other than id and also have non-unique name or title.
'''
@receiver(pre_save, sender = Book)
def add_slug(sender, instance, *args, **kwargs):
    if instance and not instance.slug:
        slug = slugify(instance.title)
        randstr = random.choices(string.ascii_lowercase+string.digits, k=5)
        rans = "-"+''.join(randstr)
        instance.slug = slug+rans

@receiver(pre_save, sender = Author)
def add_slug(sender, instance, *args, **kwargs):
    if instance and not instance.slug:
        slug = slugify(instance.name)
        randstr = random.choices(string.ascii_lowercase+string.digits, k=5)
        rans = "-"+''.join(randstr)
        instance.slug = slug+rans


@receiver(pre_save, sender = Genre)
def add_slug(sender, instance, *args, **kwargs):
    if instance and not instance.slug:
        slug = slugify(instance.name)
        randstr = random.choices(string.ascii_lowercase+string.ascii_uppercase+string.digits, k=5)
        rans = "-"+''.join(randstr)
        instance.slug = slug+rans


'''
Whenever a book is altered/created this sets the avaibility of the book accordingly.
'''
@receiver(pre_save, sender = Book)
def add_bool(sender, instance, *args, **kwargs):
    if instance.issued_to is None:
        instance.availability = True
    else:
        instance.availability = False


