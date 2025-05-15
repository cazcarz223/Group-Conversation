(()=>{
    let bar;
    (function barAtTop(){
        bar = bar || document.querySelector("#bod table:first-child");
        if (bar) {
            document.body.prepend(bar);
            bar.style.marginTop = "-50px";
            bar.style.marginBottom = "-27px"; 
            let nextElement = bar.nextElementSibling;
            if (nextElement) {
                nextElement.style.marginTop = "-25px"; 
            }
        }
        window.requestAnimationFrame(barAtTop);
    })();
})();

PennController.ResetPrefix(null);

Sequence("consent-and-information", "enter-information", "warning", "block1-instr", "practice1-warn", randomize("practice1-trial"), "block1-warn", randomize("block1"), 
        "block2_instr", "practice2-warn", randomize("practice2"), "block2-warn", 
        "waiting-for-pairing", randomize("block2"), "block3-instr", randomize("block3-1-again"), "feedback", "endScreen")

function getRandomTime() {
    return Math.floor(Math.random() * 3000) + 4000;
}

newTrial("consent-and-information",
    newText("thank", 
        "<p>Thank you very much for your participation! This study is part of a Cornell University scientific research project. Your decision to complete the study is voluntary. There is no way for us to identify you. The only information we will have, in addition to your responses, is the time at which you completed the survey. The results of the research may be presented at scientific meetings or published in scientific journals.</p>"
        + "<p>Please note that for part of this experiment, you will be randomly and anonymously paired with two other participants who are completing a similar experiment. During this time, all three of you will be able to see each other’s responses, but you and the two other participants will remain completely anonymous throughout. The participant-matching process should take no more than 5 minutes but may vary depending on availability. "
        + "In the case that the matching does not happen within 10 minutes, or if one of the other participants becomes unresponsive for more than 2 minutes, you may end the experiment but still be compensated for your time. Please make sure you have stable internet connection during that portion of the experiment.</p>"
        + "<p>By clicking on next below you indicate that you are at least 18 years of age and agree to complete this survey voluntarily. If you have any questions regarding the experiment, please reach out to <b>haparicio@cornell.edu</b>.</p>"
    )
    .css("width", "600px")
    .center()
    ,
    newCanvas("consent", 800, 400)
        .add("center at 50%", 0, getText("thank"))
        .print()
    ,
    newButton("Next")
        .center()
        .print()
        .wait()
)

newTrial("enter-information",
    newText("Please enter your information below")
        .center()
        .print()
        .css("margin-bottom", "20px") 
    
    ,
    newText("Age:")
        .center()
        .print()
        .css("margin-bottom", "3px") 
    ,
    newTextInput("Age")
        .center()
        .print()
        .log()
        .css("margin-bottom", "20px") 
    ,
    newText("Gender:")
        .center()
        .print()
        .css("margin-bottom", "3px")
    ,
    newTextInput("Gender")
        .center()
        .print()
        .log()
        .css("margin-bottom", "20px")
    ,
    newText("Native Language:")
        .center()
        .print()
        .css("margin-bottom", "3px")
    ,
    newTextInput("Native Language")
        .center()
        .print()
        .log()
        .css("margin-bottom", "20px")
    ,
    newText("Prolific ID:")
        .center()
        .print()
        .css("margin-bottom", "3px")
    ,
    newTextInput("Prolific ID")
        .center()
        .print()
        .log()
        .css("margin-bottom", "20px")
    ,
    newButton("Continue")
        .center()
        .print()
        .wait(
            getTextInput("Age").testNot.text("") 
            .and(getTextInput("Gender").testNot.text("")) 
            .and(getTextInput("Native Language").testNot.text("")) 
            .and(getTextInput("Prolific ID").testNot.text(""))
            .failure(
                newText("Please fill in all fields before continuing.")
                    .color("red")
                    .center()
                    .print()
                    .css("margin-top", "10px") 
            )
        )
);

// Warning
newTrial("warning",
    newText("chrome", "<p>Please note that this experiment will only work in <b>Google Chrome</b>. Additionally, due to internet reasons, sometimes the screen will display 'Please wait for resources to preload' and never proceed. Please let us know via Prolific if this happens. <br/>Furthermore, please ensure that you are doing the experiment in full screen so that all elements of the experiment is visible. Zoom in and out as needed. Thank you in advance.</p>")
    ,
    newCanvas("consent", 700,120)
        .add("center at 50%", 0, getText("chrome"))
        .center()
        .print()
    ,
    newScale("I understand and have maximized my screen")
        .css("margin-top", "10px")
        .checkbox()
        .center()
        .print()
    ,
    newButton("Continue")
        .center()
        .css("margin-top", "20px")
        .print()
        .wait(
            getScale("I understand and have maximized my screen").test.selected() 
            .failure(
                newText("Please check the box to continue")
                    .color("red")
                    .center()
                    .print()
                    .css("margin-top", "10px") 
            )
        )
);

// Block 1 Instructions
newTrial("block1-instr",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", "<p>In this portion of the experiment, you will read a sentence and see an image.</p>")
    ,
    newText("instructions-3", "<b>Indicate whether or not you agree with the sentence describing the image:</b>")
    ,
    newText("instructions-4", "<p>Press the <b>F</b> key to indicate yes.<br>Press the <b>J</b> key to indicate no.</p>")
    ,
    newText("instructions-5", "<p>This is not timed so take as long as you need to answer.</p>")
    ,
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait()
);
// Block 1 Practice trials
newTrial("practice1-warn",
  newText("warn", "<p> In order to help you understand the task, we have four practice trials for you.  These trials are not recorded, so please take your time to familiarize yourself with the task. </p>")
  ,
  newCanvas("warn", 700,100)
    .add("center at 50%", 0, getText("warn"))
    .center()
    .print()
  ,
  newButton("Next")
    .center()
    .print()
    .wait()
);

Template("practice.csv", row =>
    newTrial("practice1-trial",
        newText("sentence", row.sentence)
            .center()
        ,
        newText("instructions-for-norming", "<p> Press <b>F</b> for yes, press <b>J</b> for no.</p>")
            .center()
        ,
        newImage("circles", row.image)
            .size(400, 400).center()
        ,
        newCanvas("norming", 700,350)
            .add("center at 50%", 0, getText("sentence").bold())
            .add("center at 50%", 10, getText("instructions-for-norming"))
            .add("center at 50%", 50, getImage("circles"))
            .center()
            .print()


        ,
        newKey("keypress", "FJ")
            .wait()
        
    )
    .log("sentence", row.sentence)
    .log("circles", row.image)
);

newTrial("block1-warn",
    defaultText.center().print(),
    newText("<p> Great! Now let's start the experiment! </p><p> Click the button to start the block session </p> "),
    newButton("Start")
    .center()
    .print()
    .wait()
);


// Block 1
Template("block13.csv", row =>
    newTrial("block1",
        newText("sentence", row.sentence)
            .center()
        ,
        newText("instructions-for-norming", "<p> Press <b>F</b> for yes, press <b>J</b> for no.</p>")
            .center()
        ,
        newImage("circles", row.image)
            .size(400, 400).center()
        ,
        newCanvas("norming", 700,350)
            .add("center at 50%", 0, getText("sentence").bold())
            .add("center at 50%", 10, getText("instructions-for-norming"))
            .add("center at 50%", 50, getImage("circles"))
            .center()
            .print()
            .log()


        ,
        newKey("keypress", "FJ")
            .log()
            .wait()
        
    )
    .log("sentence", row.sentence)
    .log("circles", row.image)
);

newTrial("block2_instr",
newText("instructions", "<p>For this part of the experiment, you will be randomly and anonymously paired with two other participants—Participant 1 and Participant 2—who are completing a similar experiment. The three of you will engage in a conversation in real time.</p>"
                          + "<p>All three of you will see the same question and image. The two other participants will respond first. Their responses will appear sequentially and in the same set order in the chat interface. "  
                          + "You will observe this conversation as it unfolds in real time. After both participants have responded, you will join the discussion by selecting your own response. <p>"
                          + "<p> All participant responses, including yours, will be visible to each other through the chat interface.</p>"  
                          + "<p>Because this is a real-time interaction, please ensure that you have a stable internet connection and avoid taking breaks. If the other participants become unresponsive for more than 2 minutes, or if you're unable to be matched within 10 minutes, you may exit the experiment but will still be compensated for your time. "  
                          + "If this happens, please contact haparicio@cornell.edu with a brief explanation to receive compensation.</p>"  
                          + "<p>Once again, please ensure that you are doing the experiment in full-screen mode so that all elements remain visible. Adjust your zoom settings as needed.</p>")
    ,
    newCanvas("consent", 700, 320)
        .add("center at 50%", 0, getText("instructions"))
        .center()
        .print()
    ,
    newScale("I understand and have maximized my screen")
        .css("margin-top", "60px")
        .checkbox()
        .center()
        .print()
    ,
    newButton("Click to Continue the Experiment")
        .center()
        .css("margin-top", "20px")
        .print()
        .wait(
            getScale("I understand and have maximized my screen").test.selected() 
            .failure(
                newText("Please check the box to continue")
                    .color("red")
                    .center()
                    .print()
                    .css("margin-top", "10px") 
            )
        )
);

// Block 2 Practice trials
newTrial("practice2-warn",
  defaultText.center().print()
  ,
newText("warn-2", "<p>Before starting the real-time conversation, you will complete four practice trials. In these trials, you will see example responses from mock participants in an interface similar to the one used in the main experiment. These trials are not recorded, so please take your time to familiarize yourself with the task.</p>")  ,
  newCanvas("warn-2", 700,100)
        .add("center at 50%", 0, getText("warn-2"))
        .center()
        .print()
    ,
  newButton("Next")
    .center()
    .print()
    .wait()
);

// Block 2 Practice trials
Template("practice2.csv", row =>
    newTrial("practice2",
        //DEFINING NEEDED DISPLAYS
            // Circle image
            newImage("circles", row.image)
                .size(300, 300),
    
            // Question
            newText("question", 
                "<p><span style='font-weight: bold;'>Question:</span> " + row.sentence + "</p>"
            ).css("font-size", "18px"),
    
            // Grey background canvas
            newCanvas("greyBackground", 450, 180)
                .css("background-color", "rgb(240, 240, 240)")
                .css("border", "2px solid black"),

            newText("mock1Response", "").css("text-align", "left"),
            newText("mock2Response", "").css("text-align", "left"),

            getText("mock1Response").text(
                "<b><span style='color: blue;'>Mock Response 1:</span></b><br>" + row.Mock1Response),
            getText("mock2Response").text(
                "<b><span style='color: purple;'>Mock Response 2:</span></b><br>" + row.Mock2Response),
        
            newText("status").text("<p style='font-size: 18px; font-weight: bold; text-align: center;'>Review the two mock responses. You'll proceed shortly.</p>"),
            newCanvas("rectangleBox4", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("mock1Response"))
                .add(18, 120, getText("mock2Response")),

            // Second main canvas
            newCanvas("mainCanvas4", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox4"))
                .center()
                .print(),
                
            newTimer("readingTimer", 5000)
                    .start()
                    .wait(),
                
            clear(),
        
        newVar("participantAnswer", ""),
        newText("answerText", ""),
        getText("status").text("<p style='font-size: 18px; font-weight: bold; text-align: center;'>Select the button that best matches your opinion...</p>"),
        newVar("Did1and2Agree", row.Did1and2Agree),
        getVar("Did1and2Agree").test.is("N")
        .success(
            // FIRST GET THE PARTICIPANT'S OPINION
            newButton("AgreeWith1", "I agree with the first response").css("width", "150px").css("font-size", "15px").center(),
            newButton("AgreeWith2", "I agree with the second response").css("width", "150px").css("font-size", "15px").center(),
            //newButton("AgreeWithBoth", "Both participants can be right").css("font-size", "13px").center(),

            // Rectangle box with responses
            newCanvas("rectangleBox5a", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("mock1Response"))
                .add(18, 120, getText("mock2Response"))
                //.add(150, 230, getButton("AgreeWithBoth"))
                .add(50, 180, getButton("AgreeWith1"))
                .add(250, 180, getButton("AgreeWith2")),

            // Second main canvas
            newCanvas("mainCanvas5a", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox5a"))
                .center()
                .print(),
    
            newSelector("participantAnswer1")
                .add(getButton("AgreeWith1"), getButton("AgreeWith2"))
                .log()
                .wait(),
            
            clear(),
            
            getButton("AgreeWith1").test.clicked()
                .success(
                    getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>&nbsp;&nbsp;&nbsp;I agree with the first response1.</span></div>"
                        ),
                ),
            getButton("AgreeWith2").test.clicked()
                .success(
                    getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>&nbsp;&nbsp;&nbsp;I agree with the second response.</span></div>"
                        ),
                ),
            //getButton("AgreeWithBoth").test.clicked()
            //    .success(
            //        getVar("participantAnswer").set(
            //        "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>Both of you could be correct.</span></div>"
            //            ),
            //    ),
        )
        .failure(
            newButton("Agree", "I agree with both responses").css("width", "160px").css("font-size", "15px").center(),
            newButton("Disagree", "I disagree with both responses").css("width", "160px").css("font-size", "15px").center(),
            
            newCanvas("rectangleBox5b", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("mock1Response"))
                .add(18, 120, getText("mock2Response"))
                .add(50, 180, getButton("Agree"))
                .add(247, 180, getButton("Disagree")),
                
            newCanvas("mainCanvas5b", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox5b"))
                .center()
                .print(),
                
            newSelector("participantAnswer2")
                .add(getButton("Agree"), getButton("Disagree"))
                .log()
                .wait(),
            clear(),
            
            getButton("Agree").test.clicked()
                .success(
                getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I agree with both of you.</span></div>"
                    ),                    
                )
                .failure(
                    getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>I disagree with both of you.</span></div>"
                    ),
                )

        ),
            getText("answerText").text(getVar("participantAnswer")),)
);

newTrial("block2-warn",
    defaultText.center().print(),
    newText("<p> Great! Now let's continue the experiment! </p><p> Click the button to start the block session </p> "),
    newButton("Start")
    .center()
    .print()
    .wait()
);

newTrial("waiting-for-pairing",
    newText("instructions-1", "<p><b>Please wait while we are matching you with two other participants.<b></p>")
    ,
    newText("instructions-2", "<p>This should not take more than 5 minutes. Remember that if you're unable to get matched within 10 minutes, you may end the experiment but still be compensated for your time.</p>")
    ,
    newCanvas("waitingCanvas", 700,100)
        .add("center at 50%", 0, getText("instructions-1"))
        .add("center at 50%", 20, getText("instructions-2"))
        .center()
        .print()
    ,
    // Pause the experiment for 17 seconds
    newTimer("wait", 17000)
        .start()
        .wait()
    ,
    // After the pause, show the successful pairing message
    getCanvas("waitingCanvas").remove() 
    ,
    newText("paired", "<p><b>You have been successfully matched with two other participants.<b></p>")
        .center()
        .print()
    ,
    newButton("continue", "Click to continue with the experiment")
        .center()
        .print()
        .wait()
);

Template("block2.csv", row =>
    newTrial("block2",
        //DEFINING NEEDED DISPLAYS
            // Circle image
            newImage("circles", row.image)
                .size(300, 300),
    
            // Question
            newText("question", 
                "<p><span style='font-weight: bold;'>Question:</span> " + row.question + "</p>"
            ).css("font-size", "18px"),
    
            // Grey background canvas
            newCanvas("greyBackground", 450, 180)
                .css("background-color", "rgb(240, 240, 240)")
                .css("border", "2px solid black"),
    
            // Set response values for "fake" participants
            newText("p1Response", "").css("text-align", "left"),
            newText("p2Response", "").css("text-align", "left"),
            
            getText("p1Response").text(
                "<b><span style='color: blue;'>Participant 1 Response:</span></b><br>" + row.Participant1Response),
            getText("p2Response").text(
                "<b><span style='color: purple;'>Participant 2 Response:</span></b><br>" + row.Participant2Response),
        
        // PART 1: GIVING TIME TO READ RESPONSES
            newText("status", "<p style='font-size: 18px; font-weight: bold;'>Press the space bar after you read the question</p>"),
            // Rectangle box containing the question and response buttons
            newCanvas("rectangleBox", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question")),
                
            // Main canvas layout
            newCanvas("mainCanvas", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox"))
                .center()
                .print(),
            
            newKey("waitToReadQuestion", " ")
                .wait(),
            clear(),
            
        // PART 2: WAITING FOR PATICIPANT 1 RESPONSE
            // Display status message
            getText("status").text("<p style='font-size: 18px; font-weight: bold;'>Waiting for Participant 1 to respond...</p>"),

            newCanvas("rectangleBox2", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question")),
            
            newCanvas("mainCanvas2", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox2"))
                .center()
                .print(),
                
            newTimer("randomWait1", getRandomTime())
                .start()
                .wait(),
                
            clear(),
        
        
        // PART 3: WAITING FOR PATICIPANT 2 RESPONSE
            getText("status").text("<p style='font-size: 18px; font-weight: bold;'>Waiting for Participant 2 to respond...</p>"),
    
            // Rectangle box with responses
            newCanvas("rectangleBox3", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("p1Response")),
    
            // Second main canvas
            newCanvas("mainCanvas3", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox3"))
                .center()
                .print(),
    
            newTimer("randomWait2", getRandomTime())
                .start()
                .wait(),
            
            clear(),
    

        // PART 4: GIVING TIME TO READ THEIR RESPONSES
            // Rectangle box with responses
            getText("status").text("<p style='font-size: 18px; font-weight: bold; text-align: center;'>Review Participant 1 and 2's answers. You'll proceed shortly.</p>"),
            newCanvas("rectangleBox4", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("p1Response"))
                .add(18, 120, getText("p2Response")),

            // Second main canvas
            newCanvas("mainCanvas4", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox4"))
                .center()
                .print(),
                
            newTimer("readingTimer", 5000)
                    .start()
                    .wait(),
                
            clear(),
        
        // PART 5: GETTING PARTICIPANT'S OPIION
        newVar("participantAnswer", ""),
        newText("answerText", ""),
        getText("status").text("<p style='font-size: 18px; font-weight: bold; text-align: center;'>Select the button that best matches your opinion...</p>"),
        newVar("Did1and2Agree", row.Did1and2Agree),
        getVar("Did1and2Agree").test.is("N")
        .success(
            // FIRST GET THE PARTICIPANT'S OPINION
            newButton("AgreeWith1", "I agree with Participant 1").css("width", "150px").css("font-size", "15px").center(),
            newButton("AgreeWith2", "I agree with Participant 2").css("width", "150px").css("font-size", "15px").center(),
            //newButton("AgreeWithBoth", "Both participants can be right").css("font-size", "13px").center(),

            // Rectangle box with responses
            newCanvas("rectangleBox5a", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("p1Response"))
                .add(18, 120, getText("p2Response"))
                //.add(150, 230, getButton("AgreeWithBoth"))
                .add(50, 180, getButton("AgreeWith1"))
                .add(250, 180, getButton("AgreeWith2")),

            // Second main canvas
            newCanvas("mainCanvas5a", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox5a"))
                .center()
                .print(),
    
            newSelector("participantAnswer1")
                .add(getButton("AgreeWith1"), getButton("AgreeWith2"))
                .log()
                .wait(),
            
            clear(),
            
            getButton("AgreeWith1").test.clicked()
                .success(
                    getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>&nbsp;&nbsp;&nbsp;I agree with Participant 1.</span></div>"
                        ),
                ),
            getButton("AgreeWith2").test.clicked()
                .success(
                    getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>&nbsp;&nbsp;&nbsp;I agree with Participant 2.</span></div>"
                        ),
                ),
            //getButton("AgreeWithBoth").test.clicked()
            //    .success(
            //        getVar("participantAnswer").set(
            //        "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>Both of you could be correct.</span></div>"
            //            ),
            //    ),
        )
        .failure(
            newButton("Agree", "I agree with both participants").css("width", "160px").css("font-size", "15px").center(),
            newButton("Disagree", "I disagree with both participants").css("width", "160px").css("font-size", "15px").center(),
            
            newCanvas("rectangleBox5b", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("p1Response"))
                .add(18, 120, getText("p2Response"))
                .add(50, 180, getButton("Agree"))
                .add(247, 180, getButton("Disagree")),
                
            newCanvas("mainCanvas5b", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox5b"))
                .center()
                .print(),
                
            newSelector("participantAnswer2")
                .add(getButton("Agree"), getButton("Disagree"))
                .log()
                .wait(),
            clear(),
            
            getButton("Agree").test.clicked()
                .success(
                getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I agree with both of you.</span></div>"
                    ),                    
                )
                .failure(
                    getVar("participantAnswer").set(
                    "<div style='text-align: right'><span style='white-space: nowrap; display: inline-block;'>I disagree with both of you.</span></div>"
                    ),
                )

        ),
            getText("answerText").text(getVar("participantAnswer")),
                           
                           
        // PART 6: "SENDING" YOUR ANSWER
            newText("yourAnswer", "<div style='text-align: right;'><b style='color: red;'>Your Response:</b>"),
            getText("status").text("<p style='font-size: 18px; font-weight: bold;'> Sending response... </p>"),
            newCanvas("rectangleBox6", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("p1Response"))
                .add(18, 120, getText("p2Response"))
                .add(330, 175, getText("yourAnswer").css("opacity", "0.5"))
                .add(260, 195, getText("answerText").css("opacity", "0.5")),
                
            newCanvas("mainCanvas6", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox6"))
                .center()
                .print(),
            newTimer("sendingTimer", 1500)
                    .start()
                    .wait(),
            clear(),
            
            getText("status").text("<p style='font-size: 18px; font-weight: bold;'>Press the space bar to continue.</p>"),
            newCanvas("rectangleBox6a", 450, 150)
                .css("border", "2px solid black")
                .add(-2, 50, getCanvas("greyBackground"))
                .add("center at 50%", -4, getText("question"))
                .add(18, 65, getText("p1Response"))
                .add(18, 120, getText("p2Response"))
                .add(330, 175, getText("yourAnswer").css("opacity", "1"))
                .add(260, 195, getText("answerText").css("opacity", "1")),
                
            newCanvas("mainCanvas6a", 650, 450)
                .css("margin-top", "-34px")
                .add("center at 50%", 10, getText("status"))
                .add("center at 50%", 60, getImage("circles"))
                .add("center at 50%", 375, getCanvas("rectangleBox6a"))
                .center()
                .print(),
            newKey("keypress", " ")
                .wait(),            

        // PART 7: ATTENTION CHECK AT END
            // Attention check variable
            newVar("attentionCheck", row.attentionCheck),
    
            getVar("attentionCheck").test.is("Y")
                .success(
                    clear(),
                    newText("inst", "<p style='font-size: 19px; font-weight: bold;'>Did the two participants agree?</p>").center(),
    
                    newButton("Yes", "Yes").css("font-size", "18px").center(),
                    newButton("No", "No").css("font-size", "18px").center(),

                    newCanvas("attentionCheckBox", 900, 220)
                        .css("border", "2px solid black")
                        .add("center at 50%", 25, getText("inst"))
                        .add(380, 90, getButton("Yes"))
                        .add(470, 90, getButton("No"))
                        .center()
                        .print(),
    
                    newSelector("choice2")
                        .add(getButton("Yes"), getButton("No"))
                        .log()
                        .wait()
                )
    )
    .log("sentence", row.question)
    .log("circles", row.image)
    .log("attentionCheck", row.attentionCheck)
);



// Block 3 Instructions
newTrial("block3-instr",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1",  "<p>In this portion of the experiment, you will read a sentence and see an image.</p>")
    ,
    newText("instructions-2",  "<b>Indicate whether or not you agree with the sentence describing the image:</b>")
    ,
    newText("instructions-3", "<p>Press the <b>F</b> key to indicate yes.<br>Press the <b>J</b> key to indicate no.</p>")
    ,
    newText("instructions-4", "<p>This is not timed so take as long as you need to answer.</p>")
    ,
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait()
);

// Block 3
Template("block13.csv", row =>
    newTrial("block3-1-again",
        newText("sentence", row.sentence)
            .center()
        ,
        newText("instructions-for-norming", "<p> Press <b>F</b> for yes, press <b>J</b> for no.</p>")
            .center()
        ,
        newImage("circles", row.image)
            .size(400, 400).center()
        ,
        newCanvas("norming", 700,350)
            .add("center at 50%", 0, getText("sentence").bold())
            .add("center at 50%", 10, getText("instructions-for-norming"))
            .add("center at 50%", 50, getImage("circles"))
            .center()
            .print()
            .log()


        ,
        newKey("keypress", "FJ")
            .log()
            .wait()
        
    )
    .log("sentence", row.sentence)
    .log("circles", row.image)
);

//Feedback
newTrial("feedback",
    defaultText
        .center()
        .print()
    ,
    newText("feedback", "<p>Finally, please let us know if you have any feedback or comments you would like to share with us.</p>")
    ,
    newTextInput("feedback", "Leave your feedback comments here.")
        .log()
        .lines(0)
        .size(400, 200)
        .center()
        .print()
    ,
    newButton("send", "Send")
        .print()
        .wait()
);

newTrial("endScreen",
    newText("thanks", "Thank you for participating in this experiment!")
        .center()
        .print()
    ,
    newText('thanks-2', "<p> Here is your completion code:")
        .center()
        .print()
    ,
    newText('completion-code', "C14H8BAI")
            .color('red')
            .center()
            .print()
    ,
    newText('thanks-3', " <p> <br> You may now exit out of this tab. <br>")
        .center()
        .print()
    ,
    SendResults()
    ,
    newTimer("forever", 1)
        .wait()            // Timer never started: will wait forever
);
