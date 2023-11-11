public class $CONCRETE_FLYWEIGHT_CLASS_NAME$ implements $FLYWEIGHT_CLASS_NAME${

    private String intrinsicState;

    public $CONCRETE_FLYWEIGHT_CLASS_NAME$(String intrinsicState){
        this.intrinsicState = intrinsicState;
    }

    @Override
    public void $OPERATION_METHOD_NAME$(String extrinsicState) {
        this.intrinsicState = extrinsicState;
    }
}
