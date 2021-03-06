
var app = angular.module('app', ['ngAnimate']);

app.run(function($rootScope) {
  $rootScope.navs = [
    {ico:"home",nav:"home/home.htm",back:['home/search.htm']},{ico:"device_hub",nav:"tree/tree.htm",back:[]}
      ,{ico:"visibility",nav:"sensors/sensors.htm",back:[]}
      ,{ico:"settings",nav:"settings/settings.htm",back:['settings/ps.htm']}
      ,{ico:"account_circle",nav:"account/account.htm",back:[]}];
    $rootScope.back= $rootScope.navs[0].back;
    $rootScope.products=[];
    $rootScope.key="";

    $rootScope.lss=function(k,v){localStorage.setItem(k,v);}
    $rootScope.lsg=function(k){return localStorage.getItem(k);}

     $rootScope.bckf=function(r) {
       $rootScope.back.push(r);
       //$scope.back= $scope.ur=='home/home.htm'? []:$scope.back;
      }
      $rootScope.search=function (key){

        for (var i = 0; i < $rootScope.products.length; i++) {
          $rootScope.products[i].querys.stop();
        }

      $rootScope.products=[];
        var do1 =(d,ipa)=>{
        var obj=JSON.parse(d.replace(/'/g,'"'));

         if(obj.rep=='0432'){
           var b = new ajqueue('http://'+ipa);
           function s(d){
             var j=JSON.parse(d.replace(/'/g,'"'));
             for (var key in j) {
             obj[key]=j[key];
           }
             $rootScope.$apply();
           }
           function f(){
             $rootScope.navs[0].back=['home/search.htm'];
             $rootScope.inc($rootScope.navs[0]);
             $rootScope.$apply();
             alert('Disconnected');
             $rootScope.search($rootScope.key);
           }
           b.s=s;
           b.f=f;
           b.fq=function(dob){
             dob.key=key;
             b.addq({data:dob,success:b.s,error:b.f})
           }

            var per= obj['repeatper']==undefined? 200:obj['repeatper'];
            if(per){
           b.repeat(per,{data:{ord:'getr',key:key},success:b.s,error:b.f,timeout:10000});
             }
           obj.querys=b;
           obj.ip=ipa;
           obj.key=key;
          $rootScope.products.push(obj);
          $rootScope.$apply();
        }
      }

      getUserIP(function(ip){
        ip=ip.split('.');ip[ip.length-1]='';ip=ip.join('.');

        for (var i = 1; i < 255; i++) {get(ip+i)}

       function get(ips){
         $.get('http://'+ips+"?ord=get&key="+key+"&ip="+ips,(d)=>{do1(d,ips)});
       }

       $rootScope.$apply();
      });

      }

      $rootScope.disc=function (){
        $rootScope.navs[0].back=['home/search.htm'];
        $rootScope.inc($rootScope.navs[0]);
        alert('Disconnected');
        $rootScope.search($rootScope.key);
      }

      $rootScope.search($rootScope.key);


      $rootScope.swhICOS=['outlet.png','washer.png','plug.png','fan1.png','fan0.png','heater.png','tv.png']

      $rootScope.swhM=function (k){
      $('#swhModal').modal('toggle');
      $rootScope.swhN=$rootScope.swhNG(k,k);
      $rootScope.swhICO=$rootScope.swhICOG(k,'outlet.png');
      $rootScope.swhK=k;
      }

      $rootScope.swhS=function (){
      $('#swhModal').modal('toggle');
      $rootScope.lss($rootScope.p.id+'/'+$rootScope.swhK+'/n',$rootScope.swhN);
      $rootScope.lss($rootScope.p.id+'/'+$rootScope.swhK+'/ico',$rootScope.swhICO);
      }

      $rootScope.swhNG=function (k,dv){
        var tmp =$rootScope.lsg($rootScope.p.id+'/'+k+'/'+'n');
        return (tmp==undefined)? dv:tmp;
      }
      $rootScope.swhICOG=function (k,dv){
        var tmp =$rootScope.lsg($rootScope.p.id+'/'+k+'/'+'ico');
        return (tmp==undefined)? dv:tmp;
      }


});

app.controller('ctrl', function($scope,$rootScope) {

$rootScope.ur = $rootScope.navs[0].nav;
$scope.bccolor='bg-light';
$rootScope.inc=function(x) {

  $rootScope.back=x.back;
  $rootScope.ur=x.nav;

};

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});


});
