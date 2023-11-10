
public class $CONCRETE_BUILDER_CLASSNAME1$ implements $BUILDER_CLASSNAME$ {

    private $PRODUCT_CLASSNAME$ product;

    public $CONCRETE_BUILDER_CLASSNAME1$() {
        this.product = new $PRODUCT_CLASSNAME$();
    }

$BUILDER_METHODS_EXTENDED$

    public $PRODUCT_CLASSNAME$ getResult() {
        return this.product;
    }
}