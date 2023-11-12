public class $CONCRETE_STATE_CLASS_NAME$ implements $STATE_CLASS_NAME${

    private $CONTEXT_CLASS_NAME$ context;

    public $CONCRETE_STATE_CLASS_NAME$(){
        this.context = new $CONTEXT_CLASS_NAME$(this);
    }

    public $CONCRETE_STATE_CLASS_NAME$($CONTEXT_CLASS_NAME$ context) {
        this.context = context;
    }

    public void setContext($CONTEXT_CLASS_NAME$ context) {
        this.context = context;
    }

    @Override
    public void $HANDLE_METHOD_NAME$() {
        //handle
    }
}
