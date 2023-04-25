# titech-login

This is a Google Chrome extension that automatically signs you in to Tokyo Tech Portal.  
Please use it at your own risk.

## Usage

1. Clone or download this repository.
1. Fill in your own user information in `dist/config.js`. (Student ID and password are optional.)
1. Launch Google Chrome.
1. Access `chrome://extensions/`.
1. Turn on Developer mode.
1. Click on "LOAD UNPAKED" (or "パッケージ化されていない拡張機能を読み込む") and then select the directory `titech-login`.
1. When accessing `https://portal.nap.gsic.titech.ac.jp`, automatically signed in.

## Notification

If you do not enter your student ID and password in `dist/config.js`, please enable the autocomplete function for your student ID and password.  
On the password entry screen, you can move to the next page by clicking on the screen.
