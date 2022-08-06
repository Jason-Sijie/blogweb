package com.sijie.blogweb.helper;

import com.sijie.blogweb.exception.InvalidParameterException;
import org.apache.logging.log4j.util.Strings;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResourceFormatValidator {
    private static final String EMAIL_REGEX = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
    private static final String UPPER_CASE_CHARS_REGEX = "(.*[A-Z].*)";
    private static final String LOWER_CASE_CHARS_REGEX = "(.*[a-z].*)";
    private static final String NUMBERS_REGEX = "(.*[0-9].*)";
    private static final String TAG_NAME_PATTERN = "[0-9a-zA-Z\\-_ ]+";

    public static final String INVALID_TAG_NAME_MESSAGE = "Invalid tag name. Tag name can only contains \"a-zA-Z0-9 -_\" characters";

    public static void validateTagName(String tagName) {
        Pattern tagNamePattern = Pattern.compile(TAG_NAME_PATTERN);
        Matcher matcher = tagNamePattern.matcher(tagName);
        if (!matcher.matches()) {
            throw new InvalidParameterException(INVALID_TAG_NAME_MESSAGE);
        }
    }

    public static void validateUsername(String username) {
        if (Strings.isEmpty(username)) {
            throw new InvalidParameterException("Invalid Parameter: username cannot be empty");
        }

        Pattern emailPattern = Pattern.compile(EMAIL_REGEX);
        if (!emailPattern.matcher(username).matches()) {
            throw new InvalidParameterException("Invalid Parameter: username must be a valid email address");
        }
    }

    public static void validatePassword(String password) {
        if (Strings.isEmpty(password)) {
            throw new InvalidParameterException("Invalid Parameter: password cannot be empty");
        }

        if (password.length() > 19 || password.length() < 8) {
            throw new InvalidParameterException("Invalid Parameter: Password must be less than 20 and more than 8 characters in length");
        }
        if (!password.matches(UPPER_CASE_CHARS_REGEX)) {
            throw new InvalidParameterException("Invalid Parameter: Password must have at least one uppercase character");
        }
        if (!password.matches(LOWER_CASE_CHARS_REGEX)) {
            throw new InvalidParameterException("Invalid Parameter: Password must have at least one lowercase character");
        }
        if (!password.matches(NUMBERS_REGEX)) {
            throw new InvalidParameterException("Invalid Parameter: Password must have at least one number");
        }
    }
}
