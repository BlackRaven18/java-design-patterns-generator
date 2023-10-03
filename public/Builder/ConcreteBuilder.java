

public class ConcreteBuilder implements Builder {

    private Product product;

    public ConcreteBuilder() {
        this.product = new Product();
    }

    @Override
    public void buildStepA() {
        // build step A
    }

    @Override
    public void buildStepB() {
        // build step B
    }

    @Override
    public void buildStepZ() {
        // build step Z
    }

    public Product getResult() {
        return this.product;
    }
}