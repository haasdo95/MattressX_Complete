import processing.serial.*;
Serial myPort;
PrintWriter output;
String[] lines;
String myString;
int linefeed = 10;

void setup() {
  String portName = Serial.list()[1];
  myPort = new Serial(this, portName, 9600);
  lines = loadStrings("totalScores.txt");
  printArray(lines);
  output = createWriter("totalScores.txt");
  //output.println("Hello");
  printArray(Serial.list());
  myPort.bufferUntil(linefeed);
}

void draw() {

}

void serialEvent(Serial myPort){
  myString = myPort.readStringUntil(linefeed);
  if (myString != null) {
    print("Hello");
    print(myString);
    print("Hello");
    myString = trim(myString);
    //append(lines, myString);
  }
  
}

void mousePressed() {
    printArray(lines);
    for(int i = 0; i < lines.length; ++i) {
      output.print(lines[i]);
      output.print(myString);
    }
    output.print(" ");
    output.flush();  // Writes the remaining data to the file
    output.close();  // Finishes the file
    exit();  // Stops the program
}