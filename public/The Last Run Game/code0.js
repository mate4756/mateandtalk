gdjs.IntroCode = {};
gdjs.IntroCode.localVariables = [];
gdjs.IntroCode.idToCallbackMap = new Map();
gdjs.IntroCode.GDScoreTextObjects1= [];
gdjs.IntroCode.GDScoreTextObjects2= [];
gdjs.IntroCode.GDScoreTextObjects3= [];
gdjs.IntroCode.GDSignObjects1= [];
gdjs.IntroCode.GDSignObjects2= [];
gdjs.IntroCode.GDSignObjects3= [];
gdjs.IntroCode.GDStartTextObjects1= [];
gdjs.IntroCode.GDStartTextObjects2= [];
gdjs.IntroCode.GDStartTextObjects3= [];
gdjs.IntroCode.GDBtnStartObjects1= [];
gdjs.IntroCode.GDBtnStartObjects2= [];
gdjs.IntroCode.GDBtnStartObjects3= [];
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects1= [];
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects2= [];
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects3= [];
gdjs.IntroCode.GDPlatformObjects1= [];
gdjs.IntroCode.GDPlatformObjects2= [];
gdjs.IntroCode.GDPlatformObjects3= [];
gdjs.IntroCode.GDBackgroundObjects1= [];
gdjs.IntroCode.GDBackgroundObjects2= [];
gdjs.IntroCode.GDBackgroundObjects3= [];
gdjs.IntroCode.GDDustParticlesObjects1= [];
gdjs.IntroCode.GDDustParticlesObjects2= [];
gdjs.IntroCode.GDDustParticlesObjects3= [];


gdjs.IntroCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("BtnStart"), gdjs.IntroCode.GDBtnStartObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.IntroCode.GDBtnStartObjects2.length;i<l;++i) {
    if ( gdjs.IntroCode.GDBtnStartObjects2[i].getBehavior("ButtonFSM").IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.IntroCode.GDBtnStartObjects2[k] = gdjs.IntroCode.GDBtnStartObjects2[i];
        ++k;
    }
}
gdjs.IntroCode.GDBtnStartObjects2.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Sign"), gdjs.IntroCode.GDSignObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.IntroCode.GDSignObjects1.length;i<l;++i) {
    if ( gdjs.IntroCode.GDSignObjects1[i].getBehavior("ButtonFSM").IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.IntroCode.GDSignObjects1[k] = gdjs.IntroCode.GDSignObjects1[i];
        ++k;
    }
}
gdjs.IntroCode.GDSignObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.leaderboards.displayLeaderboard(runtimeScene, "6270957b-e1d5-497f-b43b-8bddbf2c70f1", true);
}
{gdjs.evtTools.runtimeScene.pushScene(runtimeScene, "LeaderboardBackground");
}
}

}


};gdjs.IntroCode.eventsList1 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("BtnStart"), gdjs.IntroCode.GDBtnStartObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.IntroCode.GDBtnStartObjects2.length;i<l;++i) {
    if ( gdjs.IntroCode.GDBtnStartObjects2[i].getBehavior("ButtonFSM").IsHovered(null) ) {
        isConditionTrue_0 = true;
        gdjs.IntroCode.GDBtnStartObjects2[k] = gdjs.IntroCode.GDBtnStartObjects2[i];
        ++k;
    }
}
gdjs.IntroCode.GDBtnStartObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("StartText"), gdjs.IntroCode.GDStartTextObjects2);
{for(var i = 0, len = gdjs.IntroCode.GDStartTextObjects2.length ;i < len;++i) {
    gdjs.IntroCode.GDStartTextObjects2[i].getBehavior("Effect").enableEffect("Hovering", true);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("BtnStart"), gdjs.IntroCode.GDBtnStartObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.IntroCode.GDBtnStartObjects2.length;i<l;++i) {
    if ( !(gdjs.IntroCode.GDBtnStartObjects2[i].getBehavior("ButtonFSM").IsHovered(null)) ) {
        isConditionTrue_0 = true;
        gdjs.IntroCode.GDBtnStartObjects2[k] = gdjs.IntroCode.GDBtnStartObjects2[i];
        ++k;
    }
}
gdjs.IntroCode.GDBtnStartObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("StartText"), gdjs.IntroCode.GDStartTextObjects2);
{for(var i = 0, len = gdjs.IntroCode.GDStartTextObjects2.length ;i < len;++i) {
    gdjs.IntroCode.GDStartTextObjects2[i].getBehavior("Effect").enableEffect("Hovering", false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Sign"), gdjs.IntroCode.GDSignObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.IntroCode.GDSignObjects2.length;i<l;++i) {
    if ( gdjs.IntroCode.GDSignObjects2[i].getBehavior("ButtonFSM").IsHovered(null) ) {
        isConditionTrue_0 = true;
        gdjs.IntroCode.GDSignObjects2[k] = gdjs.IntroCode.GDSignObjects2[i];
        ++k;
    }
}
gdjs.IntroCode.GDSignObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.IntroCode.GDScoreTextObjects2);
{for(var i = 0, len = gdjs.IntroCode.GDScoreTextObjects2.length ;i < len;++i) {
    gdjs.IntroCode.GDScoreTextObjects2[i].getBehavior("Effect").enableEffect("Hovering", true);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Sign"), gdjs.IntroCode.GDSignObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.IntroCode.GDSignObjects1.length;i<l;++i) {
    if ( !(gdjs.IntroCode.GDSignObjects1[i].getBehavior("ButtonFSM").IsHovered(null)) ) {
        isConditionTrue_0 = true;
        gdjs.IntroCode.GDSignObjects1[k] = gdjs.IntroCode.GDSignObjects1[i];
        ++k;
    }
}
gdjs.IntroCode.GDSignObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.IntroCode.GDScoreTextObjects1);
{for(var i = 0, len = gdjs.IntroCode.GDScoreTextObjects1.length ;i < len;++i) {
    gdjs.IntroCode.GDScoreTextObjects1[i].getBehavior("Effect").enableEffect("Hovering", false);
}
}
}

}


};gdjs.IntroCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("ScoreText"), gdjs.IntroCode.GDScoreTextObjects1);
{for(var i = 0, len = gdjs.IntroCode.GDScoreTextObjects1.length ;i < len;++i) {
    gdjs.IntroCode.GDScoreTextObjects1[i].setTextAlignment("center");
}
}
}

}


{


gdjs.IntroCode.eventsList0(runtimeScene);
}


{


gdjs.IntroCode.eventsList1(runtimeScene);
}


};

gdjs.IntroCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.IntroCode.GDScoreTextObjects1.length = 0;
gdjs.IntroCode.GDScoreTextObjects2.length = 0;
gdjs.IntroCode.GDScoreTextObjects3.length = 0;
gdjs.IntroCode.GDSignObjects1.length = 0;
gdjs.IntroCode.GDSignObjects2.length = 0;
gdjs.IntroCode.GDSignObjects3.length = 0;
gdjs.IntroCode.GDStartTextObjects1.length = 0;
gdjs.IntroCode.GDStartTextObjects2.length = 0;
gdjs.IntroCode.GDStartTextObjects3.length = 0;
gdjs.IntroCode.GDBtnStartObjects1.length = 0;
gdjs.IntroCode.GDBtnStartObjects2.length = 0;
gdjs.IntroCode.GDBtnStartObjects3.length = 0;
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects1.length = 0;
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects2.length = 0;
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects3.length = 0;
gdjs.IntroCode.GDPlatformObjects1.length = 0;
gdjs.IntroCode.GDPlatformObjects2.length = 0;
gdjs.IntroCode.GDPlatformObjects3.length = 0;
gdjs.IntroCode.GDBackgroundObjects1.length = 0;
gdjs.IntroCode.GDBackgroundObjects2.length = 0;
gdjs.IntroCode.GDBackgroundObjects3.length = 0;
gdjs.IntroCode.GDDustParticlesObjects1.length = 0;
gdjs.IntroCode.GDDustParticlesObjects2.length = 0;
gdjs.IntroCode.GDDustParticlesObjects3.length = 0;

gdjs.IntroCode.eventsList2(runtimeScene);
gdjs.IntroCode.GDScoreTextObjects1.length = 0;
gdjs.IntroCode.GDScoreTextObjects2.length = 0;
gdjs.IntroCode.GDScoreTextObjects3.length = 0;
gdjs.IntroCode.GDSignObjects1.length = 0;
gdjs.IntroCode.GDSignObjects2.length = 0;
gdjs.IntroCode.GDSignObjects3.length = 0;
gdjs.IntroCode.GDStartTextObjects1.length = 0;
gdjs.IntroCode.GDStartTextObjects2.length = 0;
gdjs.IntroCode.GDStartTextObjects3.length = 0;
gdjs.IntroCode.GDBtnStartObjects1.length = 0;
gdjs.IntroCode.GDBtnStartObjects2.length = 0;
gdjs.IntroCode.GDBtnStartObjects3.length = 0;
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects1.length = 0;
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects2.length = 0;
gdjs.IntroCode.GDTitulo_9595de_9595juegoObjects3.length = 0;
gdjs.IntroCode.GDPlatformObjects1.length = 0;
gdjs.IntroCode.GDPlatformObjects2.length = 0;
gdjs.IntroCode.GDPlatformObjects3.length = 0;
gdjs.IntroCode.GDBackgroundObjects1.length = 0;
gdjs.IntroCode.GDBackgroundObjects2.length = 0;
gdjs.IntroCode.GDBackgroundObjects3.length = 0;
gdjs.IntroCode.GDDustParticlesObjects1.length = 0;
gdjs.IntroCode.GDDustParticlesObjects2.length = 0;
gdjs.IntroCode.GDDustParticlesObjects3.length = 0;


return;

}

gdjs['IntroCode'] = gdjs.IntroCode;
