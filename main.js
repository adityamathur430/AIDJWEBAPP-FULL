song="";

function preload()
{
    song=loadSound("music.mp3");
}

score_rightwrist=0;
score_leftwrist=0;

rightwristx=0;
rightwristy=0;

leftwristx=0;
leftwristy=0;

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log('Posenet is Initialized!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_rightwrist = results[0].pose.keypoints[10].score;
        score_leftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist="+score_rightwrist+"scoreLeftWrist="+score_leftwrist);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);

    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#ffffff");
    stroke("#eb4710");

    if(score_rightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);

        if(rightwristy>0 && rightwristy<=100)
        {
            document.getElementById("speed_heading").innerHTML ="Speed= 0.5x";
            song.rate(0.5);
        }

        else if(rightwristy>100 && rightwristy<=200)
        {
            document.getElementById("speed_heading").innerHTML ="Speed= 1x";
            song.rate(1);
        }

        else if(rightwristy>200 && rightwristy<=300)
        {
            document.getElementById("speed_heading").innerHTML ="Speed= 1.5x";
            song.rate(1.5);
        }

        else if(rightwristy>300 && rightwristy<=400)
        {
            document.getElementById("speed_heading").innerHTML ="Speed= 2x";
            song.rate(2);
        }

        else if(rightwristy>400)
        {
            document.getElementById("speed_heading").innerHTML ="Speed= 2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftwrist >0.2)
    {
        circle(leftwristx,leftwristy,20);
        leftwristyNumber = Number(leftwristy);
        remove_decimals = floor(leftwristyNumber);
        volume= remove_decimals/500;
        document.getElementById("volume_heading").innerHTML = "Volume = " +volume;
        song.setVolume(volume);
    } 
} 

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}