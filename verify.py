import pyotp


# 生成密钥
secret = pyotp.random_base32()
print("Secret:", secret)

# 生成TOTP对象
totp = pyotp.TOTP(secret)

# 生成当前的2FA代码
current_code = totp.now()
print("Current OTP:", current_code)

# 验证2FA代码
verified = totp.verify(current_code)
print("Verified:" if verified else "Not Verified")
