# 마이타이머( mytimer )

## 목적
- 새로운 걸 만들어 보고 능력을 쌓는다.
 
## 이번에 경험 해볼 것
- Ionic : Cordova 기반의 하이브리드 앱을 만들기 위한 wrapper framework
- angular.js : javascript 기반 Frontend mvc framework
- bootstrap : Frontend css framework
- gulp : stream 기반 build tool
 
## 기능 요구 사항
- 해당 어플리케이션은 모든 스마트 디바이스 및 웹 브라우저에서 동작하여야 한다.
- 간단하지만 사용자 경험을 위한 css animation을 사용한다.
- 사용자가 타이머를 만들면 목록으로 관리되어야 한다.
- 목록에서 타이머를 추가하거나 수정, 삭제 할 수 있어야 한다.
- 하나의 타이머에는 이름과 다수의 interval이 등록되어야 하며 각 interval 당 시간과 interval정보가 등록되어 있어야한다.
- 각 interval의 위치를 서로 변경할 수 있어야 한다.
- 저장된 타이머는 어플리케이션이 종료되어도 사라지지 않아야 한다.
- 스마트 디바이스에서 동작 시 디바이스가 sleep 되지 않도록 해야한다.
- 열심히 해보자.
 
## 화면 목록
- 타이머 목록
- 타이머 등록
- 타이머 수정
- 타이머( 타이머가 동작하는 화면 )

### 참고사항
- 코도바 cli 5.0.0 이상에서 안드로이드 4.1.x 버전 에뮬레이터 실행 시 미동작 대처법
	- platforms/cordova/lib/device.js 의 101번 라인을 아래와 같이 변경 
	- adb 옵션중 `-d` 옵션이 `install` 옵션 뒤에 있으면 안되기 때문
```
var cmd = 'adb -d -s ' + resolvedTarget.target + ' install -r "' + apk_path + '"';
```
- genymotion을 사용하여 에뮬리에팅 할 경우 ionic command( 첫번째 인자로 emulate 가 아닌 `run` 옵션을 이용한다. )
```
ionic run android
```
- 간단한 마크다운 문법
```
 볼드체 : **볼드체**
 이탤릭체 : *이탤릭체*
 링크 : [링크명](http://some-url.com)
 대체 텍스트 : ![대체 텍스트](http://some-url.com/a.png)
 블럭 인용 : 각 문단의 첫 줄 앞에 >
 목록 : 줄의 처음을 - 또는 1.로 시작
 코드블럭 : 줄의 처음을 Tab으로 시작
```
> [마크다운 사용법-놀부님](http://nolboo.github.io/blog/2014/04/15/how-to-use-markdown/)

> [깃허브 취향의 마크다운 문법-놀부님](http://nolboo.github.io/blog/2014/03/25/github-flavored-markdown/)
