public class ConcreteCreator implements Creator{

    @Override
    public void someOperation() {

    }

    @Override
    public Product createProduct() {
        return new ConcreteProduct();
    }
}
