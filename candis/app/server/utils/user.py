class MailMessage():
    
    @classmethod
    def forgot_password_body(cls, url, reset_token, time):
        return '<h2>Reset token is: </h2><a href={}>{}</a><h3>Link is valid for {}.</h3>'.format(url, reset_token, time)


