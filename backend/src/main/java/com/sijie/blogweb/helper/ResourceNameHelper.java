package com.sijie.blogweb.helper;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResourceNameHelper {
    private static final String TAG_NAME_PATTERN = "[0-9a-zA-Z\\-_ ]+";
    private static final Pattern tagNamePattern = Pattern.compile(TAG_NAME_PATTERN);

    public static final String INVALID_TAG_NAME_MESSAGE = "Invalid tag name. Tag name can only contains \"a-zA-Z0-9 -_\" characters";

    public static boolean isValidTagName(String tagName) {
        Matcher matcher = tagNamePattern.matcher(tagName);
        return matcher.matches();
    }
}
