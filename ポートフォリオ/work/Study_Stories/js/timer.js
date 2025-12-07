//タイマーの時間を表示する場所を覚える変数の宣言
let timerStringDOM;

//開始時間を記録する変数の宣言
let startTime;

//タイマーを識別するID
let timerId = null;

//現在の経過時間を記録しておく変数
let currentTimerTime = 0;

//htmlが完全に読み取られてから実行
window.onload = function() {
    timerStringDOM = this.document.getElementById('timerString');
    //開始する前は00:00:00と表示
    timerStringDOM.innerHTML = '00:00:00'
};

function msecToSecString(time) {
    //単位をミリ秒から秒へ変換
    time = Math.floor(time /1000);
    //秒数
    const seconds = time % 60;
    //分数
    const minutes = Math.floor(time /60);
    //時間数
    const hours = Math.floor(time /3600);

    //取得した数値も2桁の文字列になるように必要に応じて0をつける
    const secondStr = (seconds < 10 ? '0' : '') + String(seconds);
    const minutesStr = (minutes < 10 ? '0': '') + String(minutes);

    return minutesStr+ ":" + String(minutes);
}

//タイマーの時刻を更新する
function UpdateTimer() {
    //現在の時刻を取得
    const nowTime = new Date().getTime();
    //タイマーの表示を更新
    timerStringDOM.innerHTML = msecToSecString(nowTime - startTime);
}

//スタートボタンが押されたときの処理
function OnStartButtonClick() {
    //すでにタイマーが右豪邸内ことを確認する
    if (timerId == null) {
        //変数startTimeに開始時間を所持する
        //現在の時間は、基準値からの経過時間(単位：ミリ秒)
        startTime = new Date().getTime() -currentTimerTime;

        //1錨(=1000ミリ秒)ことにタイマーを更新する処理を記述する
        timerId = setInterval(UpdateTimer, 1000);
    }
}

//ストップボタンが押されたときの処理
function OnStopButtonClick() {
    if (timerId != null) {
        //タイマーIDで指定したタイマーをストップする
        clearInterval(timerId);
        timerId = null;

        //現在までの経過時間を記録してタイマーの表示を更新
        const nowTime = new Date().getTime();
        currentTimerTime = nowTime - startTime;

        timerStringDOM.innerHTML = msecToSecString(currentTimerTime);
    }
}

//リセットボタンが押されたときの処理
function OnResetButtonClick() {
    //一度タイマーを止める
    OnStopButtonClick();

    //表示時間を00:00にする
    timerStringDOM.innerHTML = '00:00:00';

    //経過時間をリセット
    currentTimerTime = 0;
}

