public class Invoker {

    private Command command;

    public Invoker(){
        this.command = null;
    }

    public Invoker(Command command){
        this.command = command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public void executeCommand(){
        command.execute();
    }


}
