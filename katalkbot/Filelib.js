const File = {};
File.getSdcardPath = function(){
    return '/storage/emulated/0';
};
File.read = function(filename){
    var file = new java.io.File(filename);
    var fis = new java.io.FileInputStream(file);
    var isr = new java.io.InputStreamReader(fis);
    var br = new java.io.BufferedReader(isr);
    str = br.readLine();
    line = "";
    while ((line = br.readLine()) != null) {
        str += "\n" + line;
    }
    fis.close();
    isr.close();
    br.close();
    return str;
}
File.save = function(filename,text){
    var file = new java.io.File(filename);
    var filewrite = new java.io.FileWriter(file, false);
    filewrite.write(text);
    filewrite.flush();
    filewrite.close();
}
