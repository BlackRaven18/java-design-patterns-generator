

public class $CONCRETE_BUILDER_CLASSNAME1$ implements $BUILDER_CLASSNAME$ {

    private $PRODUCT_CLASSNAME$ product;

    public $CONCRETE_BUILDER_CLASSNAME1$() {
        this.product = new $PRODUCT_CLASSNAME$();
    }

$BUILDER_METHODS_EXTENDED$

    // @Override
    // public void buildStepA() {
    //     // build step A
    // }

    // @Override
    // public void buildStepB() {
    //     // build step B
    // }

    // @Override
    // public void buildStepZ() {
    //     // build step Z
    // }

    public $PRODUCT_CLASSNAME$ getResult() {
        return this.product;
    }
}