public class ConcreteElement implements Element{
    @Override
    public void acceptVisitor(Visitor visitor) {
        visitor.visitConcreteElement(this);
    }

    public void operationA(){

    }
}
