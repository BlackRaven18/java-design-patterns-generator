public class $CONTEXT_CLASS_NAME$ {

    private $STATE_CLASS_NAME$ state;

    public $CONTEXT_CLASS_NAME$($STATE_CLASS_NAME$ initialState) {
        this.state = initialState;
    }

    public void changeState($STATE_CLASS_NAME$ state){
        this.state = state;
    }

    public void request(){
        state.$HANDLE_METHOD_NAME$();
    }


}
