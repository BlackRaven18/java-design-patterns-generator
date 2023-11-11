public class $DECORATOR_CLASS_NAME$ implements $COMPONENT_CLASS_NAME${

    protected $COMPONENT_CLASS_NAME$ component;

    public $DECORATOR_CLASS_NAME$($COMPONENT_CLASS_NAME$ component){
        this.component = component;
    }

    @Override
    public void $OPERATION_METHOD_NAME$() {
        component.$OPERATION_METHOD_NAME$();
    }
}
