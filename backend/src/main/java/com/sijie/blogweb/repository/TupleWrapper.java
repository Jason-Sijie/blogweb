package com.sijie.blogweb.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.Tuple;
import javax.persistence.TupleElement;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigInteger;

public class TupleWrapper {
    private static Logger logger = LoggerFactory.getLogger(TupleWrapper.class);
    private static String MODIFIER_PREFIX = "set";
    private static String ACCESSOR_PREFIX = "get";

    private Tuple tuple;

    public TupleWrapper(Tuple tuple) {
        this.tuple = tuple;
    }

    public <T> T toObject(Class<T> targetClass) {
        try {
            T instance = targetClass.newInstance();
            transformTupleElementToInstanceField(instance);
            return instance;
        } catch (InstantiationException | IllegalAccessException ex) {
            logger.error(ex.toString());
            return null;
        }
    }

    private <T> void transformTupleElementToInstanceField(T instance) {
        Class targetClass = instance.getClass();

        for (TupleElement tupleElement : tuple.getElements()) {
            String fieldName = getFieldNameFromTupleAlias(tupleElement.getAlias());
            String modifierName = constructModifierNameFromFieldName(fieldName);

            try {
                Class fieldType = getFieldType(targetClass, fieldName);
                T fieldValue = (T) castTupleElementValueToField(tupleElement, fieldType);

                Method modifier = targetClass.getMethod(modifierName, fieldType);
                modifier.invoke(instance, fieldValue);

            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException ex) {
                // no-op
                logger.debug(ex.toString());
            }
        }
    }

    private String getFieldNameFromTupleAlias(String alias) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < alias.length(); i++) {
            Character ch = alias.charAt(i);
            if (!ch.equals('_')) {
                stringBuilder.append(ch);
            } else if (i < alias.length() - 1) {
                stringBuilder.append(Character.toUpperCase(alias.charAt(++i)));
            }
        }
        return stringBuilder.toString();
    }

    private Class getFieldType(Class targetClass, String fieldName) throws NoSuchMethodException {
        String accessorName = constructAccessorNameFromFieldName(fieldName);
        Method method = targetClass.getMethod(accessorName);
        return method.getReturnType();
    }

    private String constructAccessorNameFromFieldName(String fieldName) {
        StringBuilder stringBuilder = new StringBuilder(fieldName);
        stringBuilder.setCharAt(0, Character.toUpperCase(stringBuilder.charAt(0)));
        stringBuilder.insert(0, ACCESSOR_PREFIX);

        return stringBuilder.toString();
    }

    private String constructModifierNameFromFieldName(String fieldName) {
        StringBuilder stringBuilder = new StringBuilder(fieldName);
        stringBuilder.setCharAt(0, Character.toUpperCase(stringBuilder.charAt(0)));
        stringBuilder.insert(0, MODIFIER_PREFIX);

        return stringBuilder.toString();
    }

    private <T> T castTupleElementValueToField(TupleElement tupleElement, Class<T> fieldType) {
        Object elementValue = tuple.get(tupleElement.getAlias());
        T fieldValue = null;

        if (elementValue instanceof BigInteger) {
            if (fieldType.equals(Long.class)) {
                fieldValue = fieldType.cast(((BigInteger) elementValue).longValue());
            } else if (fieldType.equals(Integer.class)) {
                fieldValue = fieldType.cast(((BigInteger) elementValue).intValue());
            }
        } else {
            fieldValue = fieldType.cast(elementValue);
        }

        return fieldValue;
    }
}
