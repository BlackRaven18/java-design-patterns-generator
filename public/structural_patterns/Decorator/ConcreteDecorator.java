public class $CONCRETE_DECORATOR_CLASS_NAME$ extends $DECORATOR_CLASS_NAME${

    public $CONCRETE_DECORATOR_CLASS_NAME$($COMPONENT_CLASS_NAME$ component) {
        super(component);
    }

    @Override
    public void $OPERATION_METHOD_NAME$() {
        super.$OPERATION_METHOD_NAME$();
        $ADDED_BEHAVIOUR_METHOD_NAME$();
    }

    public void $ADDED_BEHAVIOUR_METHOD_NAME$(){

    }
}
