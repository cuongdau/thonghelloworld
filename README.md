# golfing

http://localhost:8081/debugger-ui/

cd android
./gradlew assembleRelease

Condition's types
http://managemyprinting.com/ebay/custompages/product_condition.html

avocode
юзер accounting@blackridgesoftware.com
пароль BRSW2018


Решение проблем, вызванных установкой дополнительных пакетов

1. react-native-select-lists выдаёт ошибку
   Failed prop type: The prop `onRequestClose` is marked as required
   in `Modal`, but its value is `undefined`.

   в node_modules/react-native-select-lists/src/list.js в компонент Modal добавить
   строку onRequestClose={() => null}

2. react выдаёт предупреждение
   isMounted(...) is deprecated in plain Javascript Classes. Instead, make sure to clean up
   subscriptions and pending requests in componentWillUnmount to prevent memory leaks.

   в node_modules/react/cjs/react.development.js удалить строку с данным предупреждением,
   функцию isMounted трогать не нужно

3. react-native-fbsdk выдаёт ошибку
   constructor AccessToken.AccessToken(String,String,String,Collection,Collection,AccessTokenSource,Date,Date,Date)
   is not applicable
   в node_modules/react-native-fbsdk/android/src/main/java/com/facebook/reactnative/androidsdk
   внести корректировку в файлах:
   добавить null в файле Utility ниже строки 72
   добавить null в файле FBGraphRequestModule ниже строки 163
   ссылка на описание проблемы и решение https://github.com/facebook/react-native/issues/21917

4. react-native при отправке сообщения в чате выдаёт ошибку
   Setting a timer for a long period of time warning 12981
   в node_modules/react-native/Libraries/Core/Timers/JSTimer;js  
   изменить значение переменной MAX_TIMER_DURATION_MS на 500 \* 1000
   
5. После 11/12/2018 консоль npm при сборке проекта может выдавать ошибки, ссылаясь на неправильную
   версию gradle библиотек react-native-vector-icons и react-native-image-picker. Чтобы исправить
   проблему нужно зайти в папку android каждой из этих библиотек и в файле build.gradle исправить
   версию на classpath 'com.android.tools.build:gradle:2.2.3', как прописано в build.gradle проекта
   
6. react-native-camera-kit Для того чтобы отключить счётчик фотографий, заходим в node_modules/
   react-native-camera-kit/src/CameraScreen/CameraKitCameraScreenBase и комментируем строки 195-197.
   
7. credit-card-type Эта библиотека возращает тип кредитной карты по её номеру. Чтобы
   значение было читаемым для сервера и не писать лишнего кода, нужно в файле index.js
   заменить следующие строки:
   var VISA = 'VI';
   var MASTERCARD = 'MC';
   var AMERICAN_EXPRESS = 'AE';
   var DISCOVER = 'DI'; 
   
8. react-native-image-resizer в node_modules/react-native-camera-resizer/android/build.gradle 
    исправить compileOnly на compile
    
Для запуска проекта в Xcode после npm install нужно выполнить следующие команды:

1) Xcode сообщит, что не находит папку third-party и расположенные в ней glog-0.3.4 и 
double-conversion-1.1.5. В терминале выполняем 
cd node_modules/react-native/scripts
./ios-install-third-party.sh

2) Далее Xcode сообщит, что 'config.h' file not found. Чтобы пофиксить, закрываем Xcode. В терминале
cd golfing/node_modules/react-native/third-party/glog-0.3.4
./configure
make
make install
После открываем Xcode, делаем чистку и можно пробовать запускать проект

3) Если в проекте есть интеграция с fbsdk, необходимо заранее скачать FacebookSDK для iOS с сайта 
разработчиков facebook и положить например в папку Documents, естественно в Xcode должна быть 
указан ссылка к этой папке

4) Xcode может сообщить, что не может найти файл libfishhook.a в 
node_modles/react-native/Libraries/WebSocket. 
Этот файл можно скопировать из ios/build/Build/Products/Debug-iphonesimulator/libfishhook.a и 
вставить в папку WebSocket по указанному ранее пути    
    
    
Иконки для TabNavigation

name="home" type="FontAwesome"
name="star" type="FontAwesome"
name="tag" type="FontAwesome"
name="md-chatboxes" type="Ionicons"
name="user-circle" type="FontAwesome"
name="md-arrow-back" type="Ionicons"
name="menu"
name="search"
name="arrow-dropright"
name="close"
name="share"
name="image"
name="send"
name="trash"
name="heart"
name="more"
name="create"
name="eye"