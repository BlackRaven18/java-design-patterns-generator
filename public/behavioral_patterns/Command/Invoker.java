public class $INVOKER_CLASS_NAME$ {

    private $COMMAND_CLASS_NAME$ command;

    public $INVOKER_CLASS_NAME$(){
        this.command = null;
    }

    public $INVOKER_CLASS_NAME$($COMMAND_CLASS_NAME$ command){
        this.command = command;
    }

    public void setCommand($COMMAND_CLASS_NAME$ command) {
        this.command = command;
    }

    public void executeCommand(){
        command.$EXECUTE_METHOD_NAME$();
    }


}
