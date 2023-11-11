public class $CONCRETE_COMMAND_CLASS_NAME$ implements $COMMAND_CLASS_NAME${

    private $RECEIVER_CLASS_NAME$ receiver;
    private $CLIENT_CLASS_NAME$ state;

    public $CONCRETE_COMMAND_CLASS_NAME$($RECEIVER_CLASS_NAME$ receiver, $CLIENT_CLASS_NAME$ state) {
        this.receiver = receiver;
        this.state = state;
    }

    @Override
    public void $EXECUTE_METHOD_NAME$() {
        receiver.$ACTION_METHOD_NAME$();
    }
}
