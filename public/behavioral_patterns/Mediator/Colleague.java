public abstract class $COLLEAGUE_CLASS_NAME$ {

    protected $MEDIATOR_CLASS_NAME$ mediator;

    public $COLLEAGUE_CLASS_NAME$($MEDIATOR_CLASS_NAME$ mediator) {
        this.mediator = mediator;
    }

    public void $OPERATION_METHOD_NAME$(){
        mediator.$NOTIFY_METHOD_NAME$(this);
    }
}
