public class $ADAPTER_CLASS_NAME$ implements $TARGET_CLASS_NAME${

    private $ADAPTEE_CLASS_NAME$ $ADAPTEE_FIELD_NAME$;

    public $ADAPTER_CLASS_NAME$(Adaptee $ADAPTEE_FIELD_NAME$){
        this.$ADAPTEE_FIELD_NAME$ = $ADAPTEE_FIELD_NAME$;
    }

    @Override
    public void $REQUEST_METHOD_NAME$() {
        $ADAPTEE_FIELD_NAME$.specificRequest();
    }
}