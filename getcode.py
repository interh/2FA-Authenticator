import pyotp
import time

existing_secret = 'YOUR_SECRER_KEY'

totp = pyotp.TOTP(existing_secret)

current_code = totp.now()
print("Current OTP:", current_code)

time_remaining = 30 - int(time.time()) % 30
print("Time remaining for current OTP: {} seconds".format(time_remaining))
