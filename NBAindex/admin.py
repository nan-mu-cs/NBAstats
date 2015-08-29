from django.contrib import admin
from NBAindex.models import playerprofile,playerdata
from NBAindex.models import UserProfile
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
# Register your models here.


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'UserProfile'

# Define a new User admin
class UserAdmin(UserAdmin):
    inlines = (UserProfileInline, )

admin.site.register(playerprofile)
admin.site.register(playerdata)
admin.site.unregister(User)
admin.site.register(User,UserAdmin)