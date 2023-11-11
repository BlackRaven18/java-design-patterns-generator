public class $UNSHARED_CONCRETE_FLYWEIGHT_CLASS_NAME$ implements $FLYWEIGHT_CLASS_NAME${

    private String allState;

    public $UNSHARED_CONCRETE_FLYWEIGHT_CLASS_NAME$(String allState){
        this.allState = allState;
    }

    @Override
    public void $OPERATION_METHOD_NAME$(String extrinsicState) {
        this.allState = extrinsicState;
    }
}
