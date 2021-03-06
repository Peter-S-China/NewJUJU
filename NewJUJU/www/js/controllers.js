'use strict';

/* Controllers */
function HomeCtrl($scope,navSvc,$rootScope) {
    $rootScope.showSettings = false;
    $scope.slidePage = function (path,type) {
        navSvc.slidePage(path,type);
    };
    $scope.back = function () {
        navSvc.back();
    };
    $scope.changeSettings = function () {
        $rootScope.showSettings = true;
    };
    $scope.closeOverlay = function () {
        $rootScope.showSettings = false;
    };
}

function NotificationCtrl($scope) {
    $scope.alertNotify = function() {
        navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };
    
    $scope.beepNotify = function() {
        navigator.notification.beep(1);
    };
    
    $scope.vibrateNotify = function() {
        navigator.notification.vibrate(3000);
    };
    
    $scope.confirmNotify = function() {
        navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };
}

function GeolocationCtrl($scope,navSvc,$rootScope) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.position=position;
        $scope.$apply();
        },function(e) { console.log("Error retrieving position " + e.code + " " + e.message) });

    $scope.back = function () {
        navSvc.back();
    };
}

function AccelerCtrl($scope) {
    navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
        $scope.acceleration  = acceleration;
        },function(e) { console.log("Error finding acceleration " + e) });
}

function DeviceCtrl($scope) {
    $scope.device = device;
}

function CompassCtrl($scope) {
    navigator.compass.getCurrentHeading(function (heading) {
        $scope.heading  = heading;
        $scope.$apply();
    },function(e) { console.log("Error finding compass " + e.code) });
}

function HackerNewsCtrl($scope, $rootScope) {

    
     $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {     

        jx.load('http://api.ihackernews.com/page',function(data){
            console.log(JSON.stringify(data));
            $rootScope.items = data.items;
            $scope.$apply();
        },'json');

    } else {
        console.log('data already loaded');
    }

    $scope.loadItem = function(item) {
        navigator.notification.alert(item.url,function() {console.log("Alert success")},"My Alert","Close");
    };
}


function ContactsCtrl($scope) {
    $scope.find = function() {
        $scope.contacts = [];
        var options = new ContactFindOptions();
        //options.filter=""; //returns all results
        options.filter=$scope.searchTxt;
        options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields,function(contacts) {
            $scope.contacts=contacts;
            $scope.$apply();
        },function(e){console.log("Error finding contacts " + e.code)},options);
    }
}

function CameraCtrl($scope) {
    $scope.takePic = function() {
        var options =   {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
            encodingType: 0     // 0=JPG 1=PNG
        }
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onSuccess,onFail,options);
    }
    var onSuccess = function(imageData) {
        console.log("On Success! ");
        $scope.picData = "data:image/jpeg;base64," +imageData;
        $scope.$apply();
    };
    var onFail = function(e) {
        console.log("On fail " + e);
    };
}


//-----------全局变量-----------
var g_codenum;
var g_userid;
var g_homenum;
var g_againstid;
var g_score;
var g_value = 0;
var g_gamename;
var g_gamenum;
var g_baseurl='http://124.127.127.186:8080';


//-----------------------------

function GetCodesCtrl($scope, $rootScope,$location) {
    
   // load in data from hacker news unless we already have
    
    $scope.loadItem = function(item) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Loginservlet?codenum=' + g_codenum ,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item4;
                
                g_userid = $rootScope.items.id;
                
                console.log("------用户编号-------" + g_userid);
                localStorage.j_username = g_userid;
                
                console.log("------成功登陆房间------用户编号-------" + localStorage.j_username);
                
                $scope.$apply();
                },'json');

        
        
        //navigator.notification.alert(item.result,function() {console.log("Alert success")},"My Alert","Close");
        
        $location.path("/step2"); // URL with query string
        
        
    };
}


function GetRoomNumCtrl($scope, $rootScope,$location) {
    
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/SendHomenum',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item5;
                g_homenum = $rootScope.items.homenum;
                $scope.$apply();
                },'json');
    } else {
        console.log('data already loaded');
    }
    
    $scope.loadItem = function(item) {
        navigator.notification.alert(item.homenum,function() {console.log("Alert success")},"My Alert","Close");
        
        
    };
    
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    
    $scope.formData = {};
  
    $scope.CreatRoom = function() {
        
        
        console.log("------homenum-------" + g_homenum);
        console.log("------userid-------" + g_userid);
        console.log("------nickname-------" + $scope.formData.name);
        
        if (!$scope.formData.name){
            
          
            $scope.message="请输入昵称";


        }else{
        
            var g_url = g_baseurl+'/JujuDemo/servlet/Createhome?id='+ g_userid +'&name='+ $scope.formData.name + '&homenum='+ g_homenum +'&userid=1';
            
            console.log(g_url);
            
            $rootScope.items = null;
            if (!$rootScope.items) {
                
                jx.load(g_url,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        $scope.$apply();
                        },'json');
                
                
                
            } else {
                
                $scope.errorName = '创建房间失败';
                console.log('创建房间失败');
                
            }
            
            $location.path("/step3");
    
        }

        };
    
}






function JoinRoomCtrl($scope, $rootScope,$location) {
    
    
    console.log("------UserID-------" + localStorage.j_username);
    g_userid = localStorage.j_username;
    
    var creatresult;
   
    $scope.formData = {};
    
    $scope.JoinRoom = function() {
        if(!$scope.formData.roomnum || !$scope.formData.nickname){
        
            $scope.message="请输入房间号和昵称";

        
        }else{
        
        var g_url = g_baseurl+'/JujuDemo/servlet/Createhome?id='+ g_userid +'&name='+ $scope.formData.nickname + '&homenum='+ $scope.formData.roomnum +'&userid=0';
     
            g_homenum =  $scope.formData.roomnum;
            
            console.log("---Json---"+ g_homenum);
            
            console.log("---Json---"+ g_url);
            
            $rootScope.items = null;
            if (!$rootScope.items) {
                
                jx.load(g_url,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        creatresult = $rootScope.items;
                        if(creatresult == '1'){
                        console.log('加入房间成功');
                        
                        $location.path("/step3");
                        
                        }else if(creatresult == '0'){
                        
                        console.log('加入房间失败');
                        $scope.message="加入房间失败";
                        
                        }
                        
                        
                        $scope.$apply();
                        },'json');
                
                
            } else {
                
                console.log('加入房间失败');
            }
            
            
            
            
        }
        
       
        
    }

}


function GetGameNumCtrl($scope, $rootScope){
    
    console.log("------游戏编号------");
    
    

}

function GetUserListCtrl($scope, $rootScope) {
    
    
    console.log("------getuserlist------homenum"+ g_homenum);
    
    $rootScope.items = null;
   // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/SendUserinfo?homenumber='+ g_homenum,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item6;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('加载失败');
    }
    
    $scope.loadItem = function(item) {
        
        console.log('用户名'+item.username);
        
        //navigator.notification.alert(item.url,function() {console.log("Alert success")},"My Alert","Close");
    };
}

function NavtoGameCtrl($scope,$rootScope,$location) {
   
    console.log('---游戏大厅---');
    
    $scope.gotonophone = function(){
        
        g_gamename="nophone";
        
        $location.path("/inggameview");
   
    }
    
    $scope.gotojgch = function(){
        
        g_gamename="jgch";
        
        $location.path("/inggameview");
        
    }
    
    $scope.gotodice = function(){
        
        g_gamename="dice";
        
        $location.path("/inggameview");
        
    }
    
    
    
}


function GetTeamList1Ctrl($scope, $rootScope,$location) {
    
    console.log('获取球队列表信息');
    console.log('---用户名---'+ g_userid);
    console.log('---房间号---'+ g_homenum);
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Sendballgame?isbegin=1',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item7;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('获取比赛列表失败');
    }

    
    $scope.loadItem = function(item) {
       
        g_againstid = item.againstid;
        //console.log('获取球队得>>>againstid<<<<'+ g_againstid);
        $rootScope.items = null;
        
        $location.path("/cbsteamdetail");
        
    }
    
}






function GetTeamList2Ctrl($scope, $rootScope,$location) {
    
    console.log('获取球队列表信息');
    console.log('---用户名---'+ g_userid);
    console.log('---房间号---'+ g_homenum);
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/Sendballgame?isbegin=0',function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item7;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    $scope.loadItem = function(item) {
        
        console.log('球队详细信息');
        
        
    };
    
}


function LoginRoomCtrl($scope){

    $scope.message = g_homenum;
    console.log("roomnum" + g_homenum);
    
}

function LoginCtrl($scope,$location,$rootScope) {
     
   if (!$rootScope.items) {
            
            jx.load(g_baseurl+'/JujuDemo/servlet/sendnum?username=139',function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item3 ;
                    
                    g_codenum = $rootScope.items.result;
                    
                    console.log("------成功获取验证码------codenum-------" + g_codenum);
                    
                    $scope.$apply();
                    },'json');
            
            
            
        } else {
            console.log('data already loaded');
        }

        console.log("验证码" + g_codenum);
    
   

}

function AnonymousChatCtrl($scope, $rootScope,$location){

    $scope.message ="匿名白板";
    console.log("匿名白板房间号" + g_homenum);
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        
        jx.load(g_baseurl+'/JujuDemo/servlet/SendMessage?homenum='+g_homenum,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item8;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    $scope.loadItem = function(item) {
        
        console.log("will open AnonymousChat windows ");
        $location.path("/mainchat");
        
        
    };
}


function SendAnonymousMessageCtrl($scope, $rootScope,$location){
    
     $scope.message ="局:"+ g_homenum;
    //
    
    $scope.formData = {};
    
    
    
    $scope.sendmessage=function(){
        
        
        if(!$scope.formData.s_message ){
        
        $scope.message ="匿名消息不能为空";
        
        }else if($scope.formData.s_message.length > 30){
        
             $scope.message ="能少打点字么";
        
        }else{
        
       var smmurl = g_baseurl+'/JujuDemo/servlet/GetMessage?homenum='+g_homenum+'&id='+g_userid+'&message='+$scope.formData.s_message+'&flag=0';
        console.log("------sending----message-------" + smmurl);
        
        }
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            
            jx.load(smmurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item9;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
     
     $location.path("/step3");
        
    }

}

function GetGuessScore($scope,$rootScope){
    
   
   console.log('获取房间号>>>g_homenum<<<<'+ g_homenum);
   console.log('获取用户ID>>>g_userid<<<<'+ g_userid);
    
   var sburl = g_baseurl+'/JujuDemo/servlet/Getballgameuser?userid='+g_userid+'&homenum='+g_homenum;;
    console.log('>>>>发送当前用户信息给服务器获取初始积分<<<<'+ sburl);
    
    $rootScope.itemf=null;
    if (!$rootScope.itemf) {
        
        jx.load(sburl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.itemf = data.cerateresult;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
  
    
    
    var gsurl=g_baseurl+'/JujuDemo/servlet/Sendballgameuser?userid='+g_userid+'&homenum='+g_homenum;
    console.log('>>>>获取积分从服务器<<<<'+ gsurl);
    
    $rootScope.itemsf=null;
    
    if (!$rootScope.itemsf) {
        
        jx.load(gsurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.itemsf = data.item10;
                
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    
    $scope.loadItem = function(item) {
            
        //navigator.notification.alert(item.freecore,function() {console.log("可用积分" + item.freecore)},"可用积分","确定");
        
        
    };

    
    }


function GetBallAgainstinfo($scope,$rootScope,$location){
    
    
    
        
        var agurl = g_baseurl+'/JujuDemo/servlet/BallAgainst?againstid='+g_againstid;
        
        console.log(agurl);
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            
            jx.load(agurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item9;
                    
    localStorage.homewinm = $rootScope.items[0].hometeam + "胜赔率"+$rootScope.items[0].homewin;
    console.log(">>>>><<<<<" + localStorage.homewinm);
     
    localStorage.flatm = "双方打平赔率"+$rootScope.items[0].flat;
    console.log(">>>>><<<<<" + localStorage.flatm);
    
    localStorage.visitingwinm = $rootScope.items[0].visitingteam +"胜赔率"+$rootScope.items[0].visitingwin;
    console.log(">>>>><<<<<" + localStorage.visitingwinm);
     $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
    
      }
    

function SendcbsinfoCtrl($scope,$rootScope,$location){

    $scope.message1= localStorage.homewinm;
    $scope.message2= localStorage.flatm;
    $scope.message3= localStorage.visitingwinm;

    $scope.formData = {};
    
    $scope.sendscore = function(){
        
        
        if($scope.formData.guesscore>500 || $scope.formData.guesscore1>500 ||$scope.formData.guesscore2 >500){
            
            navigator.notification.alert("您的可用积分不够",function() {console.log("Alert success")},"好好猜比赛","确定");
            
        }
        
        if(!$scope.formData.guesscore && !$scope.formData.guesscore1 &&!$scope.formData.guesscore2){
            
            navigator.notification.alert("您不下注怎么猜",function() {console.log("Alert success")},"好好猜比赛","确定");
            
        }
        
        
        if(!$scope.formData.guesscore){
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},"能好好猜比赛么","确定");
            
        }else{
            
            var ggurl=g_baseurl+'/JujuDemo/servlet/Getballgamecore?userid='+g_userid+'&againstid='+g_againstid+'&homewincore='+ $scope.formData.guesscore +'&homenum='+g_homenum;
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},ggurl,"确定");
            console.log(ggurl);
            
            $rootScope.items = null;
            if (!$rootScope.items) {
                
                jx.load(ggurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        },'json');
                
                
                
            } else {
                console.log('data already loaded');
            }
            
            
            
            
            $location.path("/cbs2");
            
        }
        
        if(!$scope.formData.guesscore1){
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},"能好好猜比赛么","确定");
            
        }else{
            
            var ggurl=g_baseurl+'/JujuDemo/servlet/Getballgamecore?userid='+g_userid+'&againstid='+g_againstid+'&flatcore='+ $scope.formData.guesscore1 +'&homenum='+g_homenum;
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},ggurl,"确定");
            console.log(ggurl);
            
            $rootScope.items=null;
            if (!$rootScope.items) {
                
                jx.load(ggurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        },'json');
                
                
            } else {
                console.log('data already loaded');
            }
            
            
            $location.path("/cbs2");
            
         
            
        }
        
        
        if(!$scope.formData.guesscore2){
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},"能好好猜比赛么","确定");
            
        }else{
            
            var ggurl=g_baseurl+'/JujuDemo/servlet/Getballgamecore?userid='+g_userid+'&againstid='+g_againstid+'&visitingwincore='+ $scope.formData.guesscore2 +'&homenum='+g_homenum;
            
            //navigator.notification.alert("提示",function() {console.log("Alert success")},ggurl,"确定");
            console.log(ggurl);
            
            $rootScope.items=null;
            if (!$rootScope.items) {
                
                jx.load(ggurl,function(data){
                        console.log(JSON.stringify(data));
                        $rootScope.items = data.cerateresult;
                        
                        },'json');
                
                
                
            } else {
                console.log('data already loaded');
            }
            
    
            $location.path("/cbs2");
        }
        
        
        
        
        
    }
    


}


function Sendballgamecore($scope,$rootScope){
    
    console.log('获取房间号>>>g_homenum<<<<'+ g_homenum);
    console.log('获取用户ID>>>g_userid<<<<'+ g_userid);
    
    var gusurl=g_baseurl+'/JujuDemo/servlet/Sendballgamecore?userid='+g_userid+'&homenum='+g_homenum;
    
    console.log(gusurl);
    
    $rootScope.items=null;
    
    if (!$rootScope.items) {
        
        jx.load(gusurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item11;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
   
}

function Exithome($scope,$rootScope,$location){

    
  var exurl =g_baseurl+'/JujuDemo/servlet/Exithome?id='+g_userid;
  //console.log('>>>>>>>>>>>>>>>' + exurl);
  
    $scope.exhome=function(){
  
    $rootScope.items = null;
    
    if (!$rootScope.items) {
        
        jx.load(exurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.cerateresult;
                $scope.$apply();
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
        navigator.notification.alert("",function() {console.log("您已经退出房间")},"退出房间","确定");
        
        $location.path("/step2");

        
    }



}

function getdmxCtrl($scope,$rootScope,$location){
    

    $scope.alertdmxNotify = function() {
        
        $rootScope.itemsmx = null;
        
        if (!$rootScope.itemsmx) {
            
            jx.load(g_baseurl+'/JujuDemo/servlet/Singleadventure',function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemsmx = data.item13;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

        
         $location.path("/dmxview2");
        
    };



}

function createNewGameCtrl($scope,$rootScope,$location){

    
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(g_baseurl+'/JujuDemo/servlet/SendHomenum',function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item5;
                    
                    localStorage.g_gamenum = $rootScope.items.homenum;
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        //console.log('>>>>>>>>>>获取游戏编号即桌号>>>>>>>>>>'+ localStorage.g_gamenum);
    
    
    
    
    $scope.creatNewGame = function() {
        
        //$scope.getNewGameNum();
       
        /*
         var g_codenum;
         var g_userid;
         var g_homenum;
         var g_againstid;
         var g_score;
         var g_gamename;
         var g_gamenum;
         
         */
        console.log("用户名" + localStorage.j_username);
        console.log("房间编号"+ g_homenum);
        console.log("游戏名" + g_gamename);
        console.log("游戏编号"+ localStorage.g_gamenum);
       
        
        var cngurl=g_baseurl+'/JujuDemo/servlet/GameUserinfo?id='+localStorage.j_username+'&gameuserid=1&gamehomenum='+localStorage.g_gamenum+'&gamename='+g_gamename+'&homenum='+g_homenum+'&isgameover=0';
        
        //console.log(cngurl);
        $rootScope.itemscn = null;
        if(!$rootScope.itemscn) {
            jx.load(cngurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemscn = data.cerateresult;
                    //console.log("------创建成功------"+ $rootScope.itemscn);
                    //if($rootScope.itemscn=1){}
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
    
        $location.path("/nophoneview");
        
        if(g_gamename == 'jgch'){
        
        $location.path("/jgchview");
        
        }else if(g_gamename == 'dice'){
        
         $location.path("/diceview");
        
        }
    }




}

function ingGameListCtrl($scope,$rootScope,$location){
    
    console.log(">>>>>>房间号" + g_homenum + ">>>>>>>游戏名称" + g_gamename);
    var getinggurl= g_baseurl +'/JujuDemo/servlet/Gameinfolist?gamename='+ g_gamename +'&homenum=' + g_homenum;
        
        console.log("DDDDDDDDD"+ getinggurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(getinggurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item15;
                    
                    $scope.message = $rootScope.items.tablenum;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }

        $scope.joinGame = function(item) {
            
            
            
        console.log("用户名" + localStorage.j_username);
        console.log("游戏名"+ g_gamename);
        console.log("游戏编号"+ item.tablenum);
            if(!item.tablenum){
            
                
            
            }else{
        
        localStorage.g_gamenum = item.tablenum;
        var cngurl=g_baseurl+'/JujuDemo/servlet/GameUserinfo?id='+localStorage.j_username +'&gameuserid=0&gamehomenum='+ item.tablenum +'&gamename='+g_gamename+'&homenum='+g_homenum+'&isgameover=0';
        
        console.log(cngurl);

        $rootScope.itemscn = null;
        if(!$rootScope.itemscn) {
            
            jx.load(cngurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.itemscn = data.cerateresult;
                    
                    console.log("------加入成功------"+ $rootScope.itemscn);
                    
                    if($rootScope.itemscn=1){
                    
                      $location.path("/nophoneview2");
                    
                    if(g_gamename='jgch'){
                    
                       $location.path("/jgchview2");
                     }
                    if(g_gamename='dice'){
                    
                      $location.path("/diceviewc3");
                    
                    }
                    
                    
                    }
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
            }
    }
    
}
//nophone游戏排名列表,用户上传数据排名

function nophonestep3Ctrl($scope,$rootScope,$location){
    
    var npscorelisturl = g_baseurl +'/JujuDemo/servlet/Sendnophonecover?gamehomenum='+ localStorage.g_gamenum;
    
    console.log("排名" + npscorelisturl);
   
    
    $rootScope.items = null;
    if (!$rootScope.items) {
        
        jx.load(npscorelisturl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item16;
                $scope.$apply();
                },'json');
     } else {
        console.log('data already loaded');
     }
     
    

    
    
    
    
    

     var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
    $scope.exitnophone = function() {
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }
    
    


}


//游戏发起者点开始游戏进入的第一个场景自动计时器启动
function nophonestep2Ctrl($scope,$timeout,$rootScope,$location){

    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var starturl= g_baseurl +'/JujuDemo/servlet/Getnophoneflag?gamehomenum='+localStorage.g_gamenum +'&nophoneflag=1';
    
    $scope.message='用户游戏编号'+ localStorage.g_gamenum;
    console.log("--开始自动上传游戏开始数据-->>" + starturl);
    $rootScope.items = null;
    // load in data from hacker news unless we already have
    
    if (!$rootScope.items) {
        
        jx.load(starturl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.sum;
                //$scope.$apply();
                },'json');
    } else {
        console.log('data already loaded');
    }
   console.log("--完成开始游戏第一步骤-->>" + starturl);
   
   $scope.value = 0;
   
    function countdown() {
        $scope.value++;
        $scope.timeout = $timeout(countdown, 1000);
    }

    countdown();
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    $scope.stopgo = function(){
        
        console.log("游戏参与者和发起者停止游戏步骤");
        $timeout.cancel($scope.timeout);
        console.log("您用了[" + $scope.value + "]秒");
        
        stopurl +=  $scope.value;
        
        console.log("--用户点击停止按钮上传游戏数据-->>" + stopurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(stopurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    //$scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
         $location.path("/nophone_is2");
        
        
        
        
    }
    


}

//游戏发起者开始游戏第一步骤等待其他加入者准备开始
function nophonestep1Ctrl($scope,$timeout,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var starturl= g_baseurl +'/JujuDemo/servlet/Getnophoneflag?gamehomenum='+localStorage.g_gamenum +'&nophoneflag=1';
    
    $scope.message='用户游戏编号'+ localStorage.g_gamenum;
    
    $scope.startgo = function(){
        
        $location.path("/nophone_is1");
    }
    
    
    var onurl = g_baseurl +'/JujuDemo/servlet/Personnum?gamehomenum='+localStorage.g_gamenum;
    
    $scope.onlinenum = function(){
        
        console.log("--获取在线用户人数方法-->>" + onurl);
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(onurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.personsum;
                    $scope.message = '当前游戏人数'+ data.personsum;
                    
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
    }


}

function nophoneGameCtrl($scope,$timeout,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
    
    console.log("--退出房间调用的方法-->>" + exurl);
    
    $scope.exitnophone = function() {
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }
    
    
    /*
    var onurl = g_baseurl +'/JujuDemo/servlet/Personnum?gamehomenum='+localStorage.g_gamenum;
    
    console.log("--获取在线用户人数方法-->>" + onurl);
    
    var starturl= g_baseurl +'/JujuDemo/servlet/Getnophoneflag?gamehomenum='+localStorage.g_gamenum +'&nophoneflag=1';
    
    
    console.log("--桌主nophone开始按钮上传数据-->>" + starturl);
    
    
    
    var npscorelisturl = g_baseurl +'/JujuDemo/servlet/Sendnophonecover?gamehomenum='+ localStorage.g_gamenum +'&sum=';
    
    
    
   
    $scope.value = 0;
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    
    function countdown() {
        $scope.value++;
        $scope.timeout = $timeout(countdown, 1000);
    }
    
    $scope.startgo = function(){
    
        console.log("start");
        countdown();
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(starturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.sum;
                    
                    npscorelisturl += data.sum;
                    
                    console.log("排名" + npscorelisturl);
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
     
        $location.path("/nophone_is1");
        
     }
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    $scope.stopgo=function(){
        
        console.log("参与者stop");
        $timeout.cancel($scope.timeout);
        console.log("您用了[" + $scope.value + "]秒");
        stopurl +=  $scope.value;
        console.log("--桌主nophone停止按钮上传数据-->>" + stopurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(stopurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

        
        

    }
    
    $scope.npscorelist = function(){
       
        console.log("最终排名");
        
        console.log("排名" + npscorelisturl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(npscorelisturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item16;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

        
    
    }
    
    $scope.onlinenum = function(){
        
        $rootScope.items = null;
        // load in data from hacker news unless we already have
        
        if (!$rootScope.items) {
            
            jx.load(onurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.personsum;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

    }
    */
    
   
   /*
    $scope.test = function() {
        setInterval(function(){console.log('haha')},1000); }
    
    $scope.test(); 
    
    
    //var p = $timeout(function(){console.log('haha')},5000);
    
    //p.then(function(){console.log('x')});
    
    //$timeout.cancel(p);
    
    $scope.test = function() {
    setTimeout(function () {
    $scope.$apply(function () {
    $scope.user = "good";
    });
    }, 2000);
    }
    */
    
    
    
}

function autoGoCtrl($scope,$timeout,$location){
    
    console.log('获取球队得>>>againstid<<<<'+ g_againstid);
    console.log('获取房间号>>>g_homenum<<<<'+ g_homenum);
    console.log('获取用户ID>>>g_userid<<<<'+ g_userid);
    
    $scope.test = function() {
        
      
        
     setInterval(function(){
                 
             
                 
                 console.log('haha')},2000);
                    	//$location.path("/cbsteamdetail");
    }
    
    $scope.test();

    //location.path("/cbsteamdetail");
    }



function SearchTeamCtrl($scope, $rootScope,$location) {
    
    console.log('获取球队列表信息');
    console.log('---用户名---'+ g_userid);
    console.log('---房间号---'+ g_homenum);
    $scope.formData = {};
    
    $scope.search = function(){
        
           console.log(">>"+ $scope.formData.teamname);
          $rootScope.items= null;
        if (!$rootScope.items) {
           
            var ssurl = g_baseurl+'/JujuDemo/servlet/Serchballgame?teamname='+$scope.formData.teamname+'&isbegin=1';
            
            console.log(ssurl);
            
        jx.load(ssurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item7;
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('获取比赛列表失败');
        }
    }
    
    $scope.loadItem = function(item) {
        g_againstid = item.againstid;
        //console.log('获取球队得>>>againstid<<<<'+ g_againstid);
        $rootScope.items = null;
        
        $location.path("/cbsteamdetail");

    };

    
    
}


function nophonestep1GameCtrl2($scope,$timeout,$rootScope,$location){
    
    var waiturl = g_baseurl +'/JujuDemo/servlet/Startnophone?gamehomenum='+localStorage.g_gamenum;
    
    console.log("等待开始状态URL" + waiturl);
    
    function countdown() {
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(waiturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.nophoneflag;
                    
                    var ccc = data.nophoneflag;
                    
                    if( ccc =='1'){
                    
                    $timeout.cancel($scope.timeout);
                    
                    $location.path("/nophone_is1");
                    
                    }
                    
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        
        $scope.timeout = $timeout(countdown, 1000);
        
    }
    
    $scope.waiting = function() {
        //setInterval(function(){console.log('haha')},1000);
        countdown();
        
    }
    
    $scope.waiting();
  

}


/*----------nophone游戏参与者--------------------------------
function nophoneGameCtrl2($scope,$timeout,$rootScope,$location){
    
    
    var exurl= g_baseurl +'/JujuDemo/servlet/Exitgamehome?id='+g_userid+'&gamehomenum='+ localStorage.g_gamenum;
    
    var waiturl = g_baseurl +'/JujuDemo/servlet/Startnophone?gamehomenum='+localStorage.g_gamenum;
    
    console.log("等待开始状态URL" + waiturl);
    
    $scope.value = 1;
    
    function countdown2() {
        $scope.value++;
        $scope.timeout = $timeout(countdown2, 1000);
    }
    
    function countdown() {
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            jx.load(waiturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.nophoneflag;
                    
                    var ccc = data.nophoneflag;
                    
                    if( ccc =='1'){
                    
                      $timeout.cancel($scope.timeout);
                      countdown2();
                    }
                   
                    
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }

       
        
        $scope.timeout = $timeout(countdown, 1000);
    
    }

    $scope.waiting = function() {
        //setInterval(function(){console.log('haha')},1000);
        countdown();
        
    }
    
    $scope.waiting();
    
    var stopurl= g_baseurl +'/JujuDemo/servlet/Getnophonecover?id='+g_userid+'&gamehomenum='+localStorage.g_gamenum+'&nophonecover=';
    
    $scope.stopgo = function(){
        
        console.log("stop");
        $timeout.cancel($scope.timeout);
        console.log("您用了[" + $scope.value + "]秒");
        stopurl +=  $scope.value;
        console.log("--参与者nophone停止按钮上传数据-->>" + stopurl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(stopurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        
        
    }
    
     var npscorelisturl = g_baseurl +'/JujuDemo/servlet/Sendnophonecover?gamehomenum='+ localStorage.g_gamenum;
    
    $scope.npscorelist = function(){
        
        console.log("最终排名");
        
        console.log("排名" + npscorelisturl);
        
        $rootScope.items = null;
        if (!$rootScope.items) {
            
            jx.load(npscorelisturl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.item16;
                    $scope.$apply();
                    },'json');
        } else {
            console.log('data already loaded');
        }
        
        
        
    }


    $scope.exitnophone = function() {
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(exurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
        
        
        $location.path("/step3");
    }
    
  


}
*/
//------游戏建立者准备开始击鼓传花游戏------
function jgchstep1GameCtrl1($scope,$timeout,$rootScope,$location){
    
    console.log(">>>>>>击鼓传花游戏准备开始<<<<<<");
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);

    var jgchurl = g_baseurl + '/JujuDemo/servlet/Senddrumflowerinfo?gamehomenum='+localStorage.g_gamenum+'&istimeover=1&gameuserid=1&id='+g_userid;
    
    
    
    $scope.startgo = function(){
    
    console.log(">>>>>>游戏建立者击鼓传花游戏步骤1<<<<<<");
    console.log(jgchurl);
        
        $rootScope.items=null;
        // load in data from hacker news unless we already have
        if (!$rootScope.items) {
            
            jx.load(jgchurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.exitresult;
                    
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
         $location.path("/jgchview2");
    
    }
}


//------游戏参与者等待开始击鼓传花游戏------
function jgchstep1GameCtrl2($scope,$timeout,$rootScope,$location){
    
    console.log(">>>>>>参与者击鼓传花游戏准备开始<<<<<<");
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var jgchurl = g_baseurl + '/JujuDemo/servlet/Senddrumflowerinfo?gamehomenum='+localStorage.g_gamenum+'&istimeover=2&gameuserid=1&id='+g_userid;
    
    console.log(jgchurl);
    $scope.isplay;
    
    var g_timer;
    
    $scope.waiting =function(){
        
     g_timer = setInterval(function(){$scope.Getgameinfo();},1000);
        
    }
    
    $scope.Getgameinfo = function(){
        
    $rootScope.items=null;
        
        if (!$rootScope.items) {
            jx.load(jgchurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.cerateresult;
                    $scope.isplay = data.randomid;
       
        console.log("游戏状态>>>1开始>>>0未开始>>>>"+ $scope.isplay);
                    
                    if($scope.isplay == g_userid){
                    
                     //console.log('PPPPPP' + $scope.isplay);
                   
                     clearInterval(g_timer);
                    
                     $location.path("/jgchview3");
                    
                    }
                   
        
                    $scope.$apply();
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
   }
    
     $scope.waiting();

}

function jgchstep2GameCtrl($scope,$timeout,$rootScope,$location){
    
    console.log(">>>>>>参与者击鼓传花传起来<<<<<<");
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var jgchurl = g_baseurl + '/JujuDemo/servlet/Senddrumflowerinfo?gamehomenum='+localStorage.g_gamenum+'&istimeover=3&gameuserid=1&id='+g_userid;
     console.log(jgchurl);
    
    
    $scope.stopvalue = Math.floor(Math.random()*10);
    console.log('<<<<<<随机数字>>>>>>'+ $scope.stopvalue);
    
    $scope.gogogo = function(){
        
        
        if($scope.stopvalue == 2){
        
        // navigator.notification.alert("Alert",function() {console.log("Alert success")},"you got it","Close");
            
          $location.path("/jgchview4");
        
        }else{
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(jgchurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.randomid;
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
        $location.path("/jgchview2");
            
        }
     }
}


function jgchstep3GameCtrl($scope,$rootScope,$location){

   console.log('你赢了');

}

//------摇骰子游戏创建者初始化游戏设置步骤1------

function diceGamesetupCtrl($scope,$rootScope,$location){
    
         console.log('摇骰子游戏开始');

}


//------摇骰子游戏创建者初始化游戏设置步骤2------

function diceGamesetup2Ctrl($scope,$rootScope,$location){
    
    console.log('吹牛查看人数');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    $scope.onlinep = function(){
    
    var diceurl = g_baseurl + '/JujuDemo/servlet/Personnum?gamehomenum='+localStorage.g_gamenum;
    
    console.log('吹牛查看人数URL>>>>>>' + diceurl);
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(diceurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item17;
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
    
    }
    

    
    $scope.onlinep();
}

function diceGamesetup3Ctrl($scope,$rootScope,$location){
    
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    $scope.value1 = Math.floor(Math.random()*6+1);
    $scope.dice1 = 'partials/' + $scope.value1 + '.PNG';
    $scope.value2 = Math.floor(Math.random()*6+1);
    $scope.dice2 = 'partials/' + $scope.value2 + '.PNG';
    $scope.value3 = Math.floor(Math.random()*6+1);
    $scope.dice3 = 'partials/' + $scope.value3 + '.PNG';
    $scope.value4 = Math.floor(Math.random()*6+1);
    $scope.dice4 = 'partials/' + $scope.value4 + '.PNG';
    $scope.value5 = Math.floor(Math.random()*6+1);
    $scope.dice5 = 'partials/' + $scope.value5 + '.PNG';
    $scope.value6 = Math.floor(Math.random()*6+1);
    $scope.dice6 = 'partials/' + $scope.value6 + '.PNG';
    $scope.alvalue = $scope.value1+','+$scope.value2+','+$scope.value3+','+$scope.value4+','+$scope.value5+','+$scope.value6;
    
    console.log('吹牛骰子随机数第一次bosonscover=' + $scope.alvalue);
    
    $scope.cnstart = function(){
        
    var cuurl = g_baseurl + '/JujuDemo/servlet/GetbosonsNum?gamehomenum='+localStorage.g_gamenum +'&bosonsnum=6';
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(cuurl,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.item17;
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }
        
       
    }
    
    $scope.cnstart();
  
    var sdurl= g_baseurl + '/JujuDemo/servlet/GetbosonsCover?gamehomenum='+localStorage.g_gamenum + '&bosonscover='+ $scope.alvalue +'&userid='+ g_userid;
    
    console.log('发送随机骰子数目' + sdurl);
    
    $scope.senddicenum = function(){
        
        $rootScope.items=null;
        if (!$rootScope.items) {
            jx.load(sdurl,function(data){
                    console.log(JSON.stringify(data));
                    $rootScope.items = data.bosonscoverflag;
                    $scope.$apply();
                    
                    },'json');
            
        } else {
            console.log('data already loaded');
        }
    
        $location.path("/diceviewc3");
    
    }
   

}

function diceGamesetup4Ctrl($scope,$rootScope,$location){
    
    console.log('摇骰子结果页面');
    console.log('>>>>>>获取用户ID==g_userid<<<<<<'+ g_userid);
    console.log('>>>>>>获取用户游戏编号<<<<<<'+ localStorage.g_gamenum);
    
    var dicejg = g_baseurl + "/JujuDemo/servlet/SendbosonsCover?gamehomenum="+ localStorage.g_gamenum +"&cate=0";
    
    console.log(dicejg);
    
    
    $rootScope.items=null;
    if (!$rootScope.items) {
        jx.load(dicejg,function(data){
                console.log(JSON.stringify(data));
                $rootScope.items = data.username;
                $scope.$apply();
                
                },'json');
        
    } else {
        console.log('data already loaded');
    }

    
}


function diceGamesetup5Ctrl($scope,$rootScope,$location){
    
    
   
}