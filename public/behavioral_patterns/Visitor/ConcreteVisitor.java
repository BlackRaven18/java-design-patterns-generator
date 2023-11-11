public class ConcreteVisitor implements Visitor{

    @Override
    public void visitConcreteElement(ConcreteElement concreteElement) {
        concreteElement.operationA();
    }
}
