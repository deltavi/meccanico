var imports = new JavaImporter(java.nio.file, java.io, java.util);
with (imports) {
	var reportName = "report.md";
    function writeReport(filename, text) {
        try {
            new File("out/").mkdirs();
            var fw = new FileWriter("out/" + filename, true);
            var bw = new BufferedWriter(fw);
            var out = new PrintWriter(bw);
            out.println(text);
            out.close();
            bw.close();
            fw.close();
        } catch (ex) {
            print("Error on " + filename + ": " + ex);
        }
    }

    var homeDir = new File("../svg");
    var sizeMap = new HashMap();
    var outMap = new HashMap();
    var listHomeDir = homeDir.listFiles();
	var iconsCounter = 0;

	print("creating " + reportName);
	
    for (var i in listHomeDir) {
        var file = listHomeDir[i];
		if(!file.getName().startsWith("_")){
			var currentPath = Paths.get(homeDir.getPath()).getParent().relativize(Paths.get(file.getPath())).toString();
			currentPath = currentPath.replaceAll("\\\\", "/");
			writeReport(reportName, "![" + file.getName().slice(0, -4) + "](" + currentPath + ")");
			iconsCounter++;
		}
    }
	writeReport(reportName, "\n" + iconsCounter + " mechanical vector icons in a web-font");
	print("done " + iconsCounter + " icons!");
}
